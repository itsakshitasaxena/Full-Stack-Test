import React from "react";
import { useCart } from "../../context/useCart";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage(){
  const { cart, updateQty, removeItem, subtotal } = useCart();
  const nav = useNavigate();

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Cart</h1>
      <div className="bg-white rounded shadow overflow-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Qty</th>
              <th className="px-4 py-2 text-right">Unit</th>
              <th className="px-4 py-2 text-right">Line</th>
              <th className="px-4 py-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map(i => (
              <tr key={i.productId} className="border-t">
                <td className="px-4 py-2">{i.product.name}</td>
                <td className="px-4 py-2">
                  <input type="number" min={1} value={i.quantity} onChange={e => updateQty(i.productId, Number(e.target.value))} className="w-24 border p-1 rounded" />
                </td>
                <td className="px-4 py-2 text-right">₹{i.unitPrice}</td>
                <td className="px-4 py-2 text-right">₹{(i.unitPrice * i.quantity).toFixed(2)}</td>
                <td className="px-4 py-2 text-right"><button onClick={()=> removeItem(i.productId)} className="text-red-600">Remove</button></td>
              </tr>
            ))}
            {cart.items.length === 0 && <tr><td className="p-4" colSpan={5}>Cart is empty</td></tr>}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-end items-center gap-4">
        <div className="text-lg">Subtotal: <strong>₹{subtotal.toFixed(2)}</strong></div>
        <button onClick={()=> nav("/checkout")} className="px-4 py-2 bg-green-600 text-white rounded">Checkout</button>
      </div>
    </div>
  );
}
