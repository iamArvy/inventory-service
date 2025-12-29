import { applyDecorators } from '@nestjs/common';
import { WAREHOUSE_ENDPOINTS } from '../constants';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { PaginatedWarehouseDto, WarehouseQueryDto } from '../dto';

export const ListWarehouseDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: WAREHOUSE_ENDPOINTS.LIST.name }),
    ApiQuery({ type: WarehouseQueryDto, required: false }),
    ApiOkResponse({
      description: 'List of warehouses retrieved successfully',
      type: PaginatedWarehouseDto,
    }),
  );
};
