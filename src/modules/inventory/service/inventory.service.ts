import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateInventoryDto,
  InventoryQueryDto,
  PatchInventoryDto,
} from '../dto';
import { PrismaService } from 'src/prisma';
import { TransactionType } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventKeys } from 'src/common/event-keys';
import { LowStockEvent } from 'src/events';
import { InventoryCreatedEvent } from 'src/events';
import { ClsService } from 'nestjs-cls';
import { RequestContext } from 'src/common/request-context';
import * as sysMsg from 'src/common/system-messages';

@Injectable()
export class InventoryService {
  private warehouseId: string;

  constructor(
    private readonly prisma: PrismaService,
    private eventEmitter: EventEmitter2,
    private readonly cls: ClsService<RequestContext>,
  ) {}

  private logger = new Logger(InventoryService.name);

  private async getWarehouse() {
    const { warehouseId } = this.cls.get();
    if (!warehouseId)
      throw new BadRequestException(sysMsg.WAREHOUSE_ID_MISSING_OR_INVALID);
    const warehouse = await this.prisma.instance.warehouse.findUnique({
      where: { id: this.warehouseId },
    });
    if (!warehouse)
      throw new BadRequestException(sysMsg.WAREHOUSE_ID_MISSING_OR_INVALID);

    return warehouse;
  }
  async create(data: CreateInventoryDto) {
    const { productId } = data;

    const warehouse = await this.getWarehouse();

    const product = await this.prisma.instance.product.findUnique({
      where: { id: productId },
    });

    // TODO: add soft delete check
    if (!product) throw new BadRequestException(sysMsg.PRODUCT_NOT_FOUND);

    const existing = await this.prisma.instance.warehouseInventory.findUnique({
      where: {
        warehouseId_productId: { warehouseId: warehouse.id, productId },
      },
    });

    if (existing) throw new BadRequestException(sysMsg.INVENTORY_CONFLICT);

    const inventory = await this.prisma.instance.warehouseInventory.create({
      // @ts-expect-error error from prisma instance
      data: { warehouseId: warehouse.id, ...data },
      include: { product: true },
    });

    this.eventEmitter.emit(
      EventKeys.INVENTORY_CREATED,
      new InventoryCreatedEvent(
        inventory.id,
        warehouse.id,
        productId,
        inventory.stock,
      ),
    );

    this.logger.log(
      `Inventory created for product ${productId} in warehouse ${warehouse.id}`,
    );
    return inventory;
  }

  async get(productId: string) {
    const warehouse = await this.getWarehouse();
    const inventory = await this.prisma.instance.warehouseInventory.findUnique({
      where: {
        warehouseId_productId: { warehouseId: warehouse.id, productId },
      },
      include: { product: true },
    });
    if (!inventory) throw new NotFoundException(sysMsg.INVENTORY_NOT_FOUND);
    return inventory;
  }

  async list(query: InventoryQueryDto) {
    const warehouse = await this.getWarehouse();

    const { sortBy, order, page, limit } = query;
    const orderBy = { [sortBy ?? 'createdAt']: order };

    const result =
      await this.prisma.instance.xprisma.warehouseInventory.paginate({
        where: {
          warehouseId: warehouse.id,
        },
        include: { product: true },
        orderBy,
        page: page ?? 1,
        limit: limit ?? 20,
      });

    return result;
  }

  async update(productId: string, data: PatchInventoryDto) {
    const warehouse = await this.getWarehouse();

    const inventory = await this.prisma.instance.warehouseInventory.findUnique({
      where: {
        warehouseId_productId: { warehouseId: warehouse.id, productId },
      },
    });
    if (!inventory) throw new NotFoundException(sysMsg.INVENTORY_NOT_FOUND);

    const updated = await this.prisma.warehouseInventory.update({
      where: { id: inventory.id },
      include: { product: true },
      data,
    });

    if (data.minStock && data.minStock > inventory.stock)
      this.eventEmitter.emit(
        EventKeys.LOW_STOCK,
        new LowStockEvent(
          inventory.id,
          warehouse.id,
          productId,
          updated.stock,
          updated.capacity,
        ),
      );

    this.logger.log(
      `Update inventory for product ${productId} in ${warehouse.id}`,
    );

    return updated;
  }

  async updateStock(
    warehouseId: string,
    productId: string,
    type: TransactionType,
    quantity: number,
  ) {
    const inventory = await this.prisma.instance.warehouseInventory.findUnique({
      where: { warehouseId_productId: { warehouseId, productId } },
    });
    if (!inventory) throw new NotFoundException(sysMsg.INVENTORY_NOT_FOUND);

    let stock = inventory.stock;

    if (type === TransactionType.inbound) {
      stock = stock + quantity;
      if (stock > inventory.capacity)
        throw new BadRequestException(sysMsg.INVENTORY_AT_MAX_CAPACITY);
    }

    if (type === TransactionType.outbound) {
      if (quantity > stock)
        throw new BadRequestException(
          sysMsg.TRANSACTION_QUANTITY_EXCEEDS_STOCK,
        );
      stock = stock - quantity;
    }
    const updated = await this.prisma.warehouseInventory.update({
      where: { id: inventory.id },
      data: {
        stock,
      },
    });

    if (stock < inventory.minStock)
      this.eventEmitter.emit(
        EventKeys.LOW_STOCK,
        new LowStockEvent(
          inventory.id,
          warehouseId,
          productId,
          updated.stock,
          updated.capacity,
        ),
      );

    this.logger.log(
      `Stock updated for product ${productId} in warehouse ${warehouseId}`,
    );
  }
}
