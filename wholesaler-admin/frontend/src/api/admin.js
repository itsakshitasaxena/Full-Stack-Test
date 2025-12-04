import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:4000/api/admin",
  headers: { "Content-Type": "application/json" }
});

// accounts
export const listAccounts = (params) => api.get("/accounts", { params }).then(r=> r.data);
export const getAccount = (id) => api.get(`/accounts/${id}`).then(r=> r.data);
export const approveAccount = (id) => api.post(`/accounts/${id}/approve`).then(r=> r.data);
export const rejectAccount = (id, body) => api.post(`/accounts/${id}/reject`, body).then(r=> r.data);
export const bulkApprove = (ids) => api.post("/accounts/bulk-approve", { ids }).then(r=> r.data);

// products/tiers
export const listProducts = () => api.get("/products").then(r=> r.data);
export const getProductTiers = (id) => api.get(`/products/${id}/tiers`).then(r=> r.data);
export const saveTiers = (id, tiers) => api.post(`/products/${id}/tiers`, { tiers }).then(r=> r.data);

// inventory
export const listInventory = () => api.get("/inventory").then(r=> r.data);
export const uploadInventoryCsv = (fd) => api.post("/inventory", fd, { headers: { "Content-Type": "multipart/form-data" } }).then(r=> r.data);
export const updateInventory = (sku, body) => api.put(`/inventory/${sku}`, body).then(r=> r.data);

// orders
export const listOrders = (params) => api.get("/orders", { params }).then(r=> r.data);
export const getOrder = (id) => api.get(`/orders/${id}`).then(r=> r.data);
export const updateOrderStatus = (id, body) => api.put(`/orders/${id}`, body).then(r=> r.data);
export const generateInvoice = (id) => api.post(`/orders/${id}/invoice`).then(r=> r.data);

// credits
export const listCredits = () => api.get("/credits").then(r=> r.data);
export const updateCredit = (id, body) => api.put(`/credits/${id}`, body).then(r=> r.data);
export const blockRetailer = (id) => api.post(`/credits/${id}/block`).then(r=> r.data);
export const unblockRetailer = (id) => api.post(`/credits/${id}/unblock`).then(r=> r.data);

export default api;
