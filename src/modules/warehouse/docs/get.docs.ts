import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { WAREHOUSE_ENDPOINTS } from '../constants';
import { WarehouseDto } from '../dto';

export const GetWarehouseDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: WAREHOUSE_ENDPOINTS.GET.name }),
    ApiOkResponse({
      description: 'Warehouse retrieved successfully',
      type: WarehouseDto,
    }),
    ApiNotFoundResponse({ description: 'Warehouse not found' }),
  );
};
