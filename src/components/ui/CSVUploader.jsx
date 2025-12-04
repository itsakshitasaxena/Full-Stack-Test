import React from "react";
import Papa from "papaparse";
import api from "../../api/api";
import { endpoints } from "../../api/endpoints";

export default function CSVUploader({ onComplete }) {
  const handle = (file) => {
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async results => {
        // Expect rows like { sku, quantity } or { productId, quantity }
        try {
          const res = await api.post(endpoints.quickCsv, { rows: results.data });
          onComplete && onComplete(res.data);
        } catch (e) {
          alert(e.response?.data?.message || e.message);
        }
      }
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <label className="block mb-2">Upload CSV (sku,quantity or productId,quantity)</label>
      <input type="file" accept=".csv" onChange={e => handle(e.target.files[0])} />
    </div>
  );
}
