import React from "react";

export default function CatalogTable({ products, onAdd }) {
  return (
    <div className="bg-white rounded shadow overflow-auto">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">SKU</th>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">MOQ</th>
            <th className="px-4 py-2 text-right">Base Price</th>
            <th className="px-4 py-2 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} className="border-t">
              <td className="px-4 py-2">{p.sku}</td>
              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2">{p.min_moq ?? p.moq ?? (p.tiers?.[0]?.minQty || 1)}</td>
              <td className="px-4 py-2 text-right">₹{p.base_price ?? p.basePrice}</td>
              <td className="px-4 py-2 text-right">
                <button onClick={() => onAdd(p)} className="px-3 py-1 bg-blue-600 text-white rounded">Add</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
