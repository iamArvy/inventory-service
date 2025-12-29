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
import { WarehouseService } from '../service';
import {
  CreateWarehouseDto,
  PatchWarehouseDto,
  UpdateWarehouseDto,
  WarehouseQueryDto,
} from '../dto';
import {
  CreateWarehouseDocs,
  GetWarehouseDocs,
  ListWarehouseDocs,
  PatchWarehouseDocs,
  UpdateWarehouseDocs,
  WarehouseControllerDocs,
} from '../docs';
import { WAREHOUSE_CONTROLLER, WAREHOUSE_ENDPOINTS } from '../constants';
import { DeleteWarehouseDocs } from '../docs/delete.docs';

@WarehouseControllerDocs()
@Controller(WAREHOUSE_CONTROLLER.basePath)
export class WarehouseController {
  constructor(private readonly service: WarehouseService) {}

  @CreateWarehouseDocs()
  @Post(WAREHOUSE_ENDPOINTS.CREATE.path)
  create(@Body() data: CreateWarehouseDto) {
    return this.service.create(data);
  }

  @GetWarehouseDocs()
  @Get(WAREHOUSE_ENDPOINTS.GET.path)
  get(@Param('id') id: string) {
    return this.service.get(id);
  }

  @ListWarehouseDocs()
  @Get(WAREHOUSE_ENDPOINTS.LIST.path)
  list(@Query() query: WarehouseQueryDto) {
    return this.service.list(query);
  }

  @UpdateWarehouseDocs()
  @Put(WAREHOUSE_ENDPOINTS.UPDATE.path)
  update(@Param('id') id: string, @Body() data: UpdateWarehouseDto) {
    return this.service.update(id, data);
  }

  @PatchWarehouseDocs()
  @Patch(WAREHOUSE_ENDPOINTS.PATCH.path)
  patch(@Param('id') id: string, @Body() data: PatchWarehouseDto) {
    return this.service.update(id, data);
  }

  @DeleteWarehouseDocs()
  @Delete(WAREHOUSE_ENDPOINTS.DELETE.path)
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
