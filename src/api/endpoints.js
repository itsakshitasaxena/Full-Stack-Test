// src/api/endpoints.js
export const endpoints = {
  register: "/auth/register",
  login: "/auth/login",

  products: "/products",
  product: (id) => `/products/${id}`,
  productTiers: (productId) => `/products/${productId}/tiers`,
  productTier: (productId, tierId) => `/products/${productId}/tiers/${tierId}`,

  inventory: "/inventory",
  orders: "/orders",
  quickCsv: "/orders/quick-csv",

  accounts: "/users",
  approveAccount: (id) => `/admin/accounts/${id}/approve`,
  rejectAccount: (id) => `/admin/accounts/${id}/reject`,

  creditInfo: (retailerId) => `/admin/credit/${retailerId}`,
  setCredit: (retailerId) => `/admin/credit/${retailerId}/set`,
};
