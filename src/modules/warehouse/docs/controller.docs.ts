import { applyDecorators } from '@nestjs/common';
import { WAREHOUSE_CONTROLLER } from '../constants';
import { ApiForbiddenResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { TENANT_HEADER } from 'src/constants';

export const WarehouseControllerDocs = () => {
  return applyDecorators(
    ApiSecurity(TENANT_HEADER.name),
    ApiTags(WAREHOUSE_CONTROLLER.tag),
    ApiForbiddenResponse(),
  );
};
