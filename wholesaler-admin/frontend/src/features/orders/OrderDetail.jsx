import React from "react";
import * as api from "../../api/admin";

export default function OrderDetail({ order, onClose, onUpdated }){
  const markShipped = async () => {
    const tracking = prompt("Enter tracking number");
    if(!tracking) return;
    await api.updateOrderStatus(order.id, { status: "Shipped", tracking });
    alert("Order marked shipped");
    onUpdated?.();
  }
  return (
    <div>
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">Order {order.id}</h4>
        <div><button onClick={onClose} className="btn">Close</button></div>
      </div>
      <div className="mt-2">Status: <strong>{order.status}</strong></div>
      <div className="mt-2">
        <button onClick={markShipped} className="btn-primary mr-2">Mark Shipped</button>
        <button onClick={()=> api.generateInvoice(order.id).then(()=> alert("Invoice generated (stub)"))} className="btn">Generate Invoice</button>
      </div>
      <div className="mt-3">
        <h5 className="font-medium">Items</h5>
        <table className="min-w-full text-sm mt-1 bg-white border"><thead><tr><th className="p-2">SKU</th><th className="p-2">Qty</th><th className="p-2">Unit</th></tr></thead>
          <tbody>
            {order.items.map((it,i)=>(<tr key={i} className="border-t"><td className="p-2">{it.sku}</td><td className="p-2">{it.qty}</td><td className="p-2">₹{it.unit_price.toFixed(2)}</td></tr>))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
