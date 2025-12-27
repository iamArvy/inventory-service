export const INVENTORY_CONTROLLER = {
  basePath: 'inventory',
  tag: 'Inventory',
} as const;

export const INVENTORY_ENDPOINTS = {
  LIST: {
    method: 'GET',
    path: '',
    name: 'Get Inventories',
  },
  GET: {
    method: 'GET',
    path: ':productId',
    name: 'Get Inventory',
  },
  CREATE: {
    method: 'POST',
    path: '',
    name: 'Create Inventory',
  },
  PATCH: {
    method: 'PATCH',
    path: ':productId',
    name: 'Patch Inventory',
  },
  UPDATE: {
    method: 'PUT',
    path: ':productId',
    name: 'Update Inventory',
  },
} as const;
