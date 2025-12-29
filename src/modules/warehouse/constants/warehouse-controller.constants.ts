export const WAREHOUSE_CONTROLLER = {
  basePath: 'warehouses',
  tag: 'Warehouse',
} as const;

export const WAREHOUSE_ENDPOINTS = {
  LIST: {
    method: 'GET',
    path: '',
    name: 'List Warehouses',
  },
  GET: {
    method: 'GET',
    path: ':id',
    name: 'Get Warehouse',
  },
  CREATE: {
    method: 'POST',
    path: '',
    name: 'Create Warehouse',
  },
  PATCH: {
    method: 'PATCH',
    path: ':id',
    name: 'Patch Warehouse',
  },
  UPDATE: {
    method: 'PUT',
    path: ':id',
    name: 'Update Warehouse',
  },
  DELETE: {
    method: 'PUT',
    path: ':id',
    name: 'Delete Warehouse',
  },
} as const;
