import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { InventoryDto } from '../dto';
import { INVENTORY_ENDPOINTS } from '../constants';

export const GetInventoryDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: INVENTORY_ENDPOINTS.GET.name }),
    ApiOkResponse({
      description: 'Inventory record retrieved',
      type: InventoryDto,
    }),
    ApiNotFoundResponse({ description: 'Inventory not found' }),
  );
};
