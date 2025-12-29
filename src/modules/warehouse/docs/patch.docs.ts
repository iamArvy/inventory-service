import { applyDecorators } from '@nestjs/common';
// import { INVENTORY_ENDPOINTS } from '../constants';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { WAREHOUSE_ENDPOINTS } from '../constants';

export const PatchWarehouseDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: WAREHOUSE_ENDPOINTS.PATCH.name }),
    ApiOkResponse({ description: 'Warehouse patched successfully' }),
    ApiNotFoundResponse({ description: 'Warehouse not found' }),
    ApiConflictResponse({ description: 'Warehouse with name exists' }),
    ApiBadRequestResponse({
      description: 'Invalid input or missing required fields',
    }),
  );
};
