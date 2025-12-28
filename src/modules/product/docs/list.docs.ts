import { applyDecorators } from '@nestjs/common';
import { PRODUCT_ENDPOINTS } from '../constants';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { PaginatedProductDto, ProductQueryDto } from '../dto';

export const ListProductDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: PRODUCT_ENDPOINTS.LIST.name }),
    ApiQuery({ type: ProductQueryDto, required: false }),
    ApiOkResponse({
      description: 'List of products retrieved successfully',
      type: PaginatedProductDto,
    }),
  );
};
