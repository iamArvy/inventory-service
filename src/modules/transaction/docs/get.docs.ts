import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { TRANSACTION_ENDPOINTS } from '../constants';
import { TransactionDto } from '../dto';

export const GetTransactionDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: TRANSACTION_ENDPOINTS.GET.name }),
    ApiOkResponse({
      description: 'Transaction retrieved successfully',
      type: TransactionDto,
    }),
    ApiNotFoundResponse({ description: 'Transaction not found' }),
  );
};
