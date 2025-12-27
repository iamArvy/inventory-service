import { applyDecorators } from '@nestjs/common';
// import { INVENTORY_ENDPOINTS } from '../constants';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UpdateInventoryDto } from '../dto';

export const UpdateInventoryDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Update an inventory record (replace)' }),
    ApiBody({ type: UpdateInventoryDto }),
    ApiOkResponse({ description: 'Inventory updated successfully' }),
    ApiNotFoundResponse({ description: 'Inventory not found' }),
    ApiBadRequestResponse({
      description: 'Invalid input or missing required fields',
    }),
  );
};
