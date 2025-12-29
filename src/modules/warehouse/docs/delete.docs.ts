import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { WAREHOUSE_ENDPOINTS } from '../constants';

export const DeleteWarehouseDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: WAREHOUSE_ENDPOINTS.DELETE.name }),
    ApiOkResponse({ description: 'Warehouse deleted successfully' }),
    ApiNotFoundResponse({ description: 'Warehouse not found' }),
    ApiBadRequestResponse({
      description: 'Warehouse already deleted',
    }),
  );
};
