import { applyDecorators } from '@nestjs/common';
import { INVENTORY_CONTROLLER } from '../constants';
import { ApiForbiddenResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { TENANT_HEADER, WAREHOUSE_HEADER } from 'src/constants';

export const InventoryControllerDocs = () => {
  return applyDecorators(
    ApiSecurity(TENANT_HEADER.name),
    ApiSecurity(WAREHOUSE_HEADER.name),
    ApiTags(INVENTORY_CONTROLLER.tag),
    ApiForbiddenResponse(),
  );
};
