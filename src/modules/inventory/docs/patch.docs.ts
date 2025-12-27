import { applyDecorators } from '@nestjs/common';
// import { INVENTORY_ENDPOINTS } from '../constants';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { PatchInventoryDto } from '../dto';

export const PatchInventoryDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Partially update an inventory record' }),
    ApiBody({ type: PatchInventoryDto }),
    ApiOkResponse({ description: 'Inventory updated successfully' }),
    ApiNotFoundResponse({ description: 'Inventory not found' }),
    ApiBadRequestResponse({
      description: 'Invalid input or missing required fields',
    }),
  );
};
