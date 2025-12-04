import React, { useState } from "react";
import { useCart } from "../../context/useCart";

export default function ProductDetail({ product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(product.min_moq || (product.tiers?.[0]?.minQty || 1));
  const computePrice = (q) => {
    const tiers = product.tiers || [];
    const exact = tiers.find(t => q >= t.minQty && (t.maxQty == null || q <= t.maxQty));
    if (exact) return exact.price;
    const fallback = tiers.filter(t=> q>=t.minQty).sort((a,b)=>b.minQty - a.minQty)[0];
    if (fallback) return fallback.price;
    return product.base_price ?? product.basePrice;
  };

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-sm text-gray-600 mt-1">{product.description}</p>

      <div className="mt-4">
        <div className="mb-2 text-sm">MOQ: <strong>{product.min_moq ?? (product.tiers?.[0]?.minQty || 1)}</strong></div>
        <div className="mb-2 text-sm">Tiers:</div>
        <table className="w-full text-sm mb-3">
          <thead><tr><th>Range</th><th className="text-right">Unit Price</th></tr></thead>
          <tbody>
            {(product.tiers || []).map(t => (
              <tr key={t.id}>
                <td>{t.minQty} - {t.maxQty == null ? "∞" : t.maxQty}</td>
                <td className="text-right">₹{t.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center gap-3">
          <input type="number" min={1} value={qty} onChange={e => setQty(Number(e.target.value))} className="w-28 border p-2 rounded" />
          <div>Unit: <strong>₹{computePrice(qty)}</strong></div>
          <div>Total: <strong>₹{(computePrice(qty)*qty).toFixed(2)}</strong></div>
          <button onClick={() => addItem(product, qty)} className="ml-auto px-3 py-1 bg-green-600 text-white rounded">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
