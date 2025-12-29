import { applyDecorators } from '@nestjs/common';
import { ApiForbiddenResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { TENANT_HEADER, WAREHOUSE_HEADER } from 'src/constants';
import { TRANSACTION_CONTROLLER } from '../constants';

export const TransactionControllerDocs = () => {
  return applyDecorators(
    ApiSecurity(TENANT_HEADER.name),
    ApiSecurity(WAREHOUSE_HEADER.name),
    ApiTags(TRANSACTION_CONTROLLER.tag),
    ApiForbiddenResponse(),
  );
};
