import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UpdateProductDto } from '../dto';
import { PRODUCT_ENDPOINTS } from '../constants';

export const DeleteProductDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: PRODUCT_ENDPOINTS.DELETE.name }),
    ApiBody({ type: UpdateProductDto }),
    ApiOkResponse({ description: 'Product deleted successfully' }),
    ApiNotFoundResponse({ description: 'Product not found' }),
    ApiBadRequestResponse({
      description: 'Product already deleted',
    }),
  );
};
