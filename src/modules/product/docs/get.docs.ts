import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { PRODUCT_ENDPOINTS } from '../constants';
import { ProductDto } from '../dto';

export const GetProductDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: PRODUCT_ENDPOINTS.GET.name }),
    ApiOkResponse({
      description: 'Product retrieved successfully',
      type: ProductDto,
    }),
    ApiNotFoundResponse({ description: 'Product not found' }),
  );
};
