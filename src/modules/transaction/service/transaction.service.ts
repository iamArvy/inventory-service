import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto, TransactionQueryDto } from '../dto';
import { PrismaService } from 'src/db';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventKeys } from 'src/common/event-keys';
import { TransactionCreatedEvent } from 'src/events';

@Injectable()
export class TransactionService {
  constructor(
    private readonly prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  private readonly logger = new Logger(TransactionService.name);

  async create(data: CreateTransactionDto) {
    const { warehouse_id, product_id } = data;
    const warehouse = await this.prisma.instance.warehouse.findUnique({
      where: { id: warehouse_id },
    });
    if (!warehouse) throw new BadRequestException('Warehouse does not exist');

    const product = await this.prisma.instance.product.findUnique({
      where: { id: product_id },
    });
    if (!product) throw new BadRequestException('Product not found');

    const inventory = await this.prisma.instance.warehouseInventory.findUnique({
      where: { warehouse_id_product_id: { warehouse_id, product_id } },
    });

    if (!inventory)
      throw new BadRequestException(
        'Inventory not found for product in warehouse',
      );

    if (data.quantity > inventory.stock)
      throw new BadRequestException('Not enough items in stock');

    const transaction = await this.prisma.instance.stockTransaction.create({
      // @ts-expect-error error from prisma instance
      data,
    });
    this.logger.log(
      `Created ${transaction.type} transaction for product ${product_id} in warehouse ${warehouse_id} `,
    );
    this.eventEmitter.emit(
      EventKeys.TRANSACTION_CREATED,
      new TransactionCreatedEvent(
        transaction.id,
        warehouse_id,
        product_id,
        transaction.quantity,
        transaction.type,
      ),
    );
    return transaction;
  }

  async get(id: string) {
    const transaction = await this.prisma.instance.stockTransaction.findUnique({
      where: { id },
    });
    if (!transaction) throw new NotFoundException('Transaction not found');
    return transaction;
  }

  async list(query: TransactionQueryDto) {
    const { sort_by, order, page, limit, warehouse_id, product_id, type } =
      query;
    const orderBy = { [sort_by ?? 'createdAt']: order };

    const result = await this.prisma.instance.stockTransaction.findMany({
      where: {
        warehouse_id,
        product_id,
        type,
      },
      orderBy,
      skip: page ?? 1,
      take: limit ?? 20,
    });

    return result;
  }
}
