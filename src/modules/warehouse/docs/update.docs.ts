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

export const UpdateWarehouseDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: WAREHOUSE_ENDPOINTS.UPDATE.name }),
    ApiOkResponse({ description: 'Warehouse updated successfully' }),
    ApiNotFoundResponse({ description: 'Warehouse not found' }),
    ApiConflictResponse({ description: 'Warehouse with name exists' }),
    ApiBadRequestResponse({
      description: 'Invalid input or missing required fields',
    }),
  );
};
