import { applyDecorators } from '@nestjs/common';
import { TRANSACTION_ENDPOINTS } from '../constants';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { PaginatedTransactionDto, TransactionQueryDto } from '../dto';

export const ListTransactionDocs = () => {
  return applyDecorators(
    ApiOperation({ summary: TRANSACTION_ENDPOINTS.LIST.name }),
    ApiQuery({ type: TransactionQueryDto, required: false }),
    ApiOkResponse({
      description: 'Paginated list of transactions retrieved successfully',
      type: PaginatedTransactionDto,
    }),
  );
};
