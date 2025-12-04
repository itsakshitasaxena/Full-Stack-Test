import React, { useState } from "react";
import { useCart } from "../../context/useCart";
import api from "../../api/api";
import { endpoints } from "../../api/endpoints";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage(){
  const { cart, subtotal, clear } = useCart();
  const [method, setMethod] = useState("credit");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function placeOrder() {
    if (cart.items.length === 0) return alert("Cart empty");
    setLoading(true);
    try {
      const items = cart.items.map(i => ({ productId: i.productId, quantity: i.quantity, unitPrice: i.unitPrice }));
      const res = await api.post(endpoints.orders, { items, paymentMethod: method });
      clear();
      nav("/orders/confirmation", { state: { order: res.data }});
    } catch(e) {
      alert(e.response?.data?.message || e.message);
    } finally { setLoading(false); }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      <div className="bg-white p-4 rounded shadow">
        <div className="mb-3">Total: <strong>₹{subtotal.toFixed(2)}</strong></div>
        <div className="mb-3">
          <label className="mr-3"><input type="radio" checked={method==="credit"} onChange={()=>setMethod("credit")} /> Credit</label>
          <label><input type="radio" checked={method==="paynow"} onChange={()=>setMethod("paynow")} /> Pay Now</label>
        </div>
        <button onClick={placeOrder} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
          {loading ? "Placing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}
