import { applyDecorators } from '@nestjs/common';
// import { INVENTORY_ENDPOINTS } from '../constants';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { PatchProductDto } from '../dto';

export const PatchProductDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Partially update a product' }),
    ApiBody({ type: PatchProductDto }),
    ApiOkResponse({ description: 'Product patched successfully' }),
    ApiNotFoundResponse({ description: 'Product not found' }),
    ApiConflictResponse({ description: 'Product with sku exists' }),
    ApiBadRequestResponse({
      description: 'Invalid input or missing required fields',
    }),
  );
};
