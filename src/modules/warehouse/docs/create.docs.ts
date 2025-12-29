import { applyDecorators } from '@nestjs/common';
import { WAREHOUSE_ENDPOINTS } from '../constants';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateWarehouseDto, WarehouseDto } from '../dto';

export const CreateWarehouseDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: WAREHOUSE_ENDPOINTS.CREATE.name }),
    ApiBody({ type: CreateWarehouseDto }),
    ApiCreatedResponse({
      description: 'Warehouse created successfully',
      type: WarehouseDto,
    }),
    ApiBadRequestResponse({
      description: 'Invalid input or missing required fields',
    }),
    ApiConflictResponse({
      description: 'Warehouse with name exists',
    }),
  );
};
