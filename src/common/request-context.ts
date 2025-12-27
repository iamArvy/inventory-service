// common/cls/request-context.ts
export interface RequestContext {
  tenantId: string;
  warehouseId: string;
  correlationId: string;
  userId?: string;
  clientId?: string;

  [key: string | symbol]: unknown;
}
