import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto, PatchProductDto, ProductQueryDto } from '../dto';
import { PrismaService } from 'src/db';
import { ClsService } from 'nestjs-cls';
import { ProductStatus } from 'src/generated/prisma/enums';

@Injectable()
export class ProductService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cls: ClsService,
  ) {}

  private logger = new Logger(ProductService.name);

  private async getProductWithSku(sku: string) {
    const tenant_id = this.cls.get<string>('tenantId');
    return this.prisma.instance.product.findUnique({
      where: { tenant_id_sku: { tenant_id, sku } },
    });
  }

  async create(data: CreateProductDto) {
    const existing = await this.getProductWithSku(data.sku);

    if (existing) throw new ConflictException('Product with sku exists');

    const product = await this.prisma.instance.product.create({
      // @ts-expect-error tenant id has already been added from prisma
      data,
    });

    this.logger.log(`Product ${product.id} created`);

    return product;
  }

  async get(id: string) {
    const product = await this.prisma.instance.product.findUnique({
      where: { id },
      include: { WarehouseInventory: { select: { stock: true } } },
    });
    if (!product) throw new NotFoundException('Product not found');
    const stock = product.WarehouseInventory.reduce(
      (total, inv) => total + inv.stock,
      0,
    );
    return { ...product, stock, WarehouseInventory: undefined };
  }

  async list(query: ProductQueryDto) {
    const { sortBy, order, page, limit, name, sku } = query;
    const orderBy = { [sortBy ?? 'createdAt']: order };

    const result = await this.prisma.instance.product.findMany({
      where: {
        name,
        sku,
      },
      orderBy,
      skip: page ?? 1,
      take: limit ?? 20,
    });
    console.log(result);

    return result;
  }

  async update(id: string, data: PatchProductDto) {
    const product = await this.prisma.instance.product.findUnique({
      where: { id },
    });
    if (!product) throw new NotFoundException('Product not found');

    if (data.sku) {
      const existing = await this.getProductWithSku(data.sku);

      if (existing && existing.id !== product.id)
        throw new ConflictException('Product with sku exists');
    }

    const update = await this.prisma.product.update({
      where: { id: product.id },
      data,
    });

    this.logger.log(`Product ${id} updated`);
    return update;
  }

  async delete(id: string) {
    const product = await this.prisma.instance.product.findUnique({
      where: { id },
    });
    if (!product) throw new NotFoundException('Product not found');
    if (product.status === ProductStatus.inactive)
      throw new BadRequestException('Product already deleted');

    await this.prisma.product.update({
      where: { id: product.id },
      data: { status: ProductStatus.inactive },
    });
    this.logger.log(`Product ${id} deleted`);
    return { success: true };
  }
}
