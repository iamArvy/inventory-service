import { applyDecorators } from '@nestjs/common';
import { INVENTORY_ENDPOINTS } from '../constants';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { InventoryQueryDto, PaginatedInventoryDto } from '../dto';

export const ListInventoryDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: INVENTORY_ENDPOINTS.LIST.name }),
    ApiQuery({ type: InventoryQueryDto }),
    ApiOkResponse({
      description: 'List of inventory records',
      type: PaginatedInventoryDto,
    }),
  );
};
