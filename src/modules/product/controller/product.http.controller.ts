import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from '../service';
import {
  CreateProductDto,
  PatchProductDto,
  ProductQueryDto,
  UpdateProductDto,
} from '../dto';
import {
  CreateProductDocs,
  GetProductDocs,
  ListProductDocs,
  PatchProductDocs,
  ProductControllerDocs,
  UpdateProductDocs,
} from '../docs';
import { PRODUCT_CONTROLLER, PRODUCT_ENDPOINTS } from '../constants';
import { DeleteProductDocs } from '../docs/delete.docs';

@ProductControllerDocs()
@Controller(PRODUCT_CONTROLLER.basePath)
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @CreateProductDocs()
  @Post(PRODUCT_ENDPOINTS.CREATE.path)
  create(@Body() data: CreateProductDto) {
    return this.service.create(data);
  }

  @GetProductDocs()
  @Get(PRODUCT_ENDPOINTS.GET.path)
  get(@Param('id') id: string) {
    return this.service.get(id);
  }

  @ListProductDocs()
  @Get(PRODUCT_ENDPOINTS.LIST.path)
  list(@Query() query: ProductQueryDto) {
    return this.service.list(query);
  }

  @UpdateProductDocs()
  @Put(PRODUCT_ENDPOINTS.UPDATE.path)
  update(@Param('id') id: string, @Body() data: UpdateProductDto) {
    return this.service.update(id, data);
  }

  @PatchProductDocs()
  @Patch(PRODUCT_ENDPOINTS.PATCH.path)
  patch(@Param('id') id: string, @Body() data: PatchProductDto) {
    return this.service.update(id, data);
  }

  @DeleteProductDocs()
  @Delete(PRODUCT_ENDPOINTS.DELETE.path)
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
