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
import { UpdateProductDto } from '../dto';
import { PRODUCT_ENDPOINTS } from '../constants';

export const UpdateProductDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: PRODUCT_ENDPOINTS.UPDATE.name }),
    ApiBody({ type: UpdateProductDto }),
    ApiOkResponse({ description: 'Product updated successfully' }),
    ApiNotFoundResponse({ description: 'Product not found' }),
    ApiConflictResponse({ description: 'Product with sku exists' }),
    ApiBadRequestResponse({
      description: 'Invalid input or missing required fields',
    }),
  );
};
