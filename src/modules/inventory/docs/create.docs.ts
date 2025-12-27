import { applyDecorators } from '@nestjs/common';
import { INVENTORY_ENDPOINTS } from '../constants';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateInventoryDto, InventoryDto } from '../dto';

export const CreateInventoryDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: INVENTORY_ENDPOINTS.CREATE.name }),
    ApiBody({ type: CreateInventoryDto }),
    ApiCreatedResponse({
      description: 'Inventory created successfully',
      type: InventoryDto,
    }),
    ApiBadRequestResponse({
      description: 'Invalid input or missing required fields',
    }),
  );
};
