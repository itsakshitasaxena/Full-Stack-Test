import React from "react";

export default function TierForm({ tiers, onChange }){
  const add = () => onChange([...tiers, { id: `t_${Date.now()}`, range_from: (tiers[tiers.length-1]?.range_to||0)+1, range_to: null, unit_price: 0 }]);
  const update = (i, patch) => { const copy = tiers.slice(); copy[i] = {...copy[i], ...patch}; onChange(copy); }
  const remove = (i) => { const copy = tiers.slice(); copy.splice(i,1); onChange(copy); }

  const validate = () => {
    const s = [...tiers].sort((a,b)=> (a.range_from||0)-(b.range_from||0));
    for(let i=0;i<s.length-1;i++){
      const a=s[i], b=s[i+1];
      if(a.range_to != null && b.range_from != null && a.range_to >= b.range_from) return false;
    }
    return true;
  }

  return (
    <div>
      <div className="space-y-2">
        {tiers.map((t, i)=> (
          <div key={t.id} className="grid grid-cols-4 gap-2">
            <input type="number" value={t.range_from ?? ""} onChange={e=> update(i, { range_from: Number(e.target.value) })} className="border p-1" placeholder="From" />
            <input type="number" value={t.range_to ?? ""} onChange={e=> update(i, { range_to: e.target.value ? Number(e.target.value) : null })} className="border p-1" placeholder="To (blank = +)" />
            <input type="number" value={t.unit_price ?? 0} onChange={e=> update(i, { unit_price: Number(e.target.value) })} className="border p-1" placeholder="Price" />
            <div><button onClick={()=> remove(i)} className="btn">Delete</button></div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <button onClick={add} className="btn">Add tier</button>
        <button onClick={()=> { if(!validate()){ alert("Invalid tiers"); return; } alert("Save logic ran (connect to API)"); }} className="btn-primary">Save</button>
      </div>
    </div>
  );
}
