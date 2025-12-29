export const TRANSACTION_CONTROLLER = {
  basePath: 'inventory/:productId/transactions',
  tag: 'Transaction',
} as const;

export const TRANSACTION_ENDPOINTS = {
  LIST: {
    method: 'GET',
    path: '',
    name: 'List Transactions for an Inventory',
  },
  GET: {
    method: 'GET',
    path: ':id',
    name: 'Get Transaction',
  },
  CREATE: {
    method: 'POST',
    path: '',
    name: 'Create Transaction',
  },
} as const;
