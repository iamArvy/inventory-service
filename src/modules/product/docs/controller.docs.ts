import { applyDecorators } from '@nestjs/common';
import { PRODUCT_CONTROLLER } from '../constants';
import { ApiForbiddenResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { TENANT_HEADER } from 'src/constants';

export const ProductControllerDocs = () => {
  return applyDecorators(
    ApiSecurity(TENANT_HEADER.name),
    ApiTags(PRODUCT_CONTROLLER.tag),
    ApiForbiddenResponse(),
  );
};
