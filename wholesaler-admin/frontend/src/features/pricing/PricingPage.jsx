import React, { useEffect, useState } from "react";
import * as api from "../../api/admin";
import TierForm from "./TierForm";

export default function PricingPage(){
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [tiers, setTiers] = useState([]);
  const [previewQty, setPreviewQty] = useState(1);

  useEffect(()=> { api.listProducts().then(setProducts); }, []);

  useEffect(()=> {
    if(!selected) return;
    api.getProductTiers(selected.id).then((t)=> setTiers(t || []));
  }, [selected]);

  const save = async () => {
    if(!selected) return;
    await api.saveTiers(selected.id, tiers);
    alert("Tiers saved");
  }

  const getPrice = (qty) => {
    const s = [...tiers].sort((a,b)=> (a.range_from||0)-(b.range_from||0));
    for(const t of s){
      if(t.range_to == null){
        if(qty >= (t.range_from||0)) return t.unit_price;
      } else if(qty >= (t.range_from||0) && qty <= t.range_to) return t.unit_price;
    }
    return null;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-1 bg-white p-3 border rounded">
        <h3 className="font-semibold mb-2">Products</h3>
        <ul>
          {products.map(p=> <li key={p.id} onClick={()=> setSelected(p)} className={"cursor-pointer p-2 rounded " + (selected?.id===p.id? "bg-slate-100": "")}>{p.name} <div className="text-xs text-slate-500">SKU: {p.sku}</div></li>)}
        </ul>
      </div>
      <div className="col-span-2 bg-white p-3 border rounded">
        {!selected ? <div>Select a product</div> : (
          <>
            <h3 className="font-semibold">{selected.name} — Tier Editor</h3>
            <TierForm tiers={tiers} onChange={setTiers} />
            <div className="mt-4">
              <label>Preview qty</label>
              <input type="number" className="border p-1 ml-2" value={previewQty} onChange={e=> setPreviewQty(Number(e.target.value||0))} />
              <div className="mt-2">Unit price: <strong>{ getPrice(previewQty) !== null ? `₹${getPrice(previewQty).toFixed(2)}` : "—" }</strong></div>
              <div className="mt-2">
                <button onClick={save} className="btn-primary">Save tiers to API</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
