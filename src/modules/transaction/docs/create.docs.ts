import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { TRANSACTION_ENDPOINTS } from '../constants';
import { TransactionDto } from '../dto';

export const CreateTransactionDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: TRANSACTION_ENDPOINTS.CREATE.name }),
    ApiCreatedResponse({
      description: 'Transaction created successfully',
      type: TransactionDto,
    }),
    ApiBadRequestResponse({
      description: 'Invalid input or missing required fields',
    }),
  );
};
