export const PRODUCT_CONTROLLER = {
  basePath: 'products',
  tag: 'Product',
} as const;

export const PRODUCT_ENDPOINTS = {
  LIST: {
    method: 'GET',
    path: '',
    name: 'List Products',
  },
  GET: {
    method: 'GET',
    path: ':id',
    name: 'Get Product',
  },
  CREATE: {
    method: 'POST',
    path: '',
    name: 'Create Product',
  },
  PATCH: {
    method: 'PATCH',
    path: ':id',
    name: 'Patch Product',
  },
  UPDATE: {
    method: 'PUT',
    path: ':id',
    name: 'Update Product',
  },
  DELETE: {
    method: 'PUT',
    path: ':id',
    name: 'Delete Product',
  },
} as const;
