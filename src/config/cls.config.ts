import { randomUUID } from 'crypto';
import { ClsModuleOptions } from 'nestjs-cls';

// common/cls/cls.config.ts
export const clsConfig: ClsModuleOptions = {
  middleware: {
    mount: true,
    setup: (cls, req: Request) => {
      cls.set('tenantId', req.headers['x-tenant-id']);
      cls.set('warehouseId', req.headers['x-warehouse-id']);
      cls.set('correlationId', req.headers['x-correlation-id'] ?? randomUUID());
    },
  },
  global: true,
};
