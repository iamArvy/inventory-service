import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InventoryService } from '../service';
import {
  CreateInventoryDto,
  InventoryQueryDto,
  PatchInventoryDto,
  UpdateInventoryDto,
} from '../dto';
import { INVENTORY_CONTROLLER, INVENTORY_ENDPOINTS } from '../constants';
import {
  CreateInventoryDocs,
  GetInventoryDocs,
  InventoryControllerDocs,
  ListInventoryDocs,
  PatchInventoryDocs,
  UpdateInventoryDocs,
} from '../docs';
import { WarehouseContextGuard } from 'src/common/guards/warehouse.guard';

@UseGuards(WarehouseContextGuard)
@InventoryControllerDocs()
@Controller(INVENTORY_CONTROLLER.basePath)
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @CreateInventoryDocs()
  @Post(INVENTORY_ENDPOINTS.CREATE.path)
  create(@Body() data: CreateInventoryDto) {
    return this.service.create(data);
  }

  @GetInventoryDocs()
  @Get(INVENTORY_ENDPOINTS.GET.path)
  get(@Param('productId') productId: string) {
    return this.service.get(productId);
  }

  @ListInventoryDocs()
  @Get(INVENTORY_ENDPOINTS.LIST.path)
  list(@Query() query: InventoryQueryDto) {
    return this.service.list(query);
  }

  @UpdateInventoryDocs()
  @Put(INVENTORY_ENDPOINTS.UPDATE.path)
  update(
    @Param('productId') productId: string,
    @Body() data: UpdateInventoryDto,
  ) {
    return this.service.update(productId, data);
  }

  @PatchInventoryDocs()
  @Patch(INVENTORY_ENDPOINTS.PATCH.path)
  patch(
    @Param('productId') productId: string,
    @Body() data: PatchInventoryDto,
  ) {
    return this.service.update(productId, data);
  }
}
