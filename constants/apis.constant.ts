export const CONST_APIS = {
  SERVER_URL: 'http://localhost:9001/api',
  FEATURES: {
    AUTH: {
      LOGIN: 'login',
      LOGOUT: 'logout',
      GET_ME: 'get-me',
      RESET_PASSWORD: 'reset-password',
      CHANGE_PASSWORD: 'change-password'
    },
    COMMON: {
      AUTH: 'auth',
      BLOGS: 'blogs',
      USERS: 'users',
      BLOG_CATEGORIES: 'blog-categories',
      ADDRESS: 'address',
      PRODUCT_CATEGORIES: 'product-categories',
      PRODUCT_REVIEW: 'product-review',
      PRODUCTS: 'products',
      INVENTORY: 'inventory',
      DISCOUNTS: 'discounts',
      CARTS: 'carts',
      CARTS_ITEMS: 'carts-items',
      CARTS_PAYMENT: 'carts-payment',
      ORDER_ITEMS: 'order-items',
      ORDER: 'order',
      PAYMENT: 'payment',
      SKIPPING: 'skipping',
      COMPANY: 'company'
    }
  }
};

export const CONST_APIS_COMMON = {
  CREATE: 'create',
  DETAIL: 'detail',
  GET_ONE_BY_FIELD: 'get-one-by-field',
  GET_MULTI_BY_FIELDS: 'get-multi-by-fields',
  GET_MULTI: 'multi',
  UPDATE: 'update',
  DELETE_MULTI: 'delete-multi'
};
