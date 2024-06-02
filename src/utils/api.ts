const host = import.meta.env.VITE_API_URL;

const API = {
  login: host + 'auth/login',
  getListTable: host + 'tables',
  getListCategory: host + 'categories',
  getListProduct: host + 'cashier/products',
};

export { API };
