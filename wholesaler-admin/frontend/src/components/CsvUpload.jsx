import React from "react";

export default function CsvUpload({ onPreview, onUpload }){
  const handle = (f) => {
    if(!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || "");
      const rows = text.split("\n").map(r => r.split(",").map(c=> c.trim())).filter(r => r.length>1);
      onPreview(rows.slice(0,20));
    }
    reader.readAsText(f);
  }
  const upload = async (e) => {
    const f = e.target.files?.[0];
    handle(f);
    if(f){
      const fd = new FormData();
      fd.append("file", f);
      await onUpload(fd);
    }
  }
  return <input type="file" accept=".csv" onChange={upload} />;
}
