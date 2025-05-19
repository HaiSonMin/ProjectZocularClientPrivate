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
      BLOGS: 'blogs'
      // Em tự điền vào đây
    }
  }
};

export const CONST_APIS_COMMON = {
  CREATE: 'create',
  GET_BY_ID: 'get-by-id',
  GET_ONE_BY_FIELD: 'get-one-by-field',
  GET_MULTI_BY_FIELDS: 'get-multi-by-fields',
  UPDATE: 'update',
  DELETE_MULTI: 'delete-multi'
};
