import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function OrderConfirmation(){
  const { state } = useLocation();
  const order = state?.order || {};
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold">Order Placed</h2>
      <p className="mt-2">Order ID: {order.orderId ?? order.id}</p>
      <Link to="/catalog" className="mt-4 inline-block px-3 py-1 bg-blue-600 text-white rounded">Back to Catalog</Link>
    </div>
  );
}
