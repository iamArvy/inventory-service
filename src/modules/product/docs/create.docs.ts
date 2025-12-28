import { applyDecorators } from '@nestjs/common';
import { PRODUCT_ENDPOINTS } from '../constants';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateProductDto, ProductDto } from '../dto';

export const CreateProductDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: PRODUCT_ENDPOINTS.CREATE.name }),
    ApiBody({ type: CreateProductDto }),
    ApiCreatedResponse({
      description: 'Product created successfully',
      type: ProductDto,
    }),
    ApiBadRequestResponse({
      description: 'Invalid input or missing required fields',
    }),
    ApiConflictResponse({
      description: 'Product with slu exists',
    }),
  );
};
