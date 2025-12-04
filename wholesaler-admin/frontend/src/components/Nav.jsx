import React from "react";

export default function Nav({ tabs, current, onChange }){
  return (
    <div className="flex gap-2">
      {tabs.map(t=> (
        <button key={t} onClick={()=> onChange(t)} className={"px-3 py-1 rounded " + (t===current ? "bg-slate-800 text-white":"bg-white border")}>
          {t}
        </button>
      ))}
    </div>
  );
}
