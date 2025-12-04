import React, { useEffect, useState } from "react";
import * as api from "../../api/admin";
import Table from "../../components/Table";

export default function CreditList(){
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    api.listCredits().then(setList).finally(() => setLoading(false));
  }, []);

  const refresh = () => {
    setLoading(true);
    api.listCredits().then(setList).finally(() => setLoading(false));
  };

  const handleRowClick = (r) => {
    const newLimit = Number(prompt("New limit", String(r.credit_limit)));
    if(!Number.isNaN(newLimit)) api.updateCredit(r.retailer_id, { limit: newLimit }).then(refresh);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Credit Management</h3>

      {loading ? <div className="text-center py-8">Loading...</div> :
        <Table
          columns={[
            { key: "retailer_name", title: "Retailer" },
            { key: "credit_limit", title: "Limit", render: (r)=> `₹${Number(r.credit_limit).toFixed(2)}` },
            { key: "amount_used", title: "Used", render: (r)=> `₹${Number(r.amount_used).toFixed(2)}`},
            { key: "available_credit", title: "Available", render: (r)=> `₹${(Number(r.credit_limit) - Number(r.amount_used)).toFixed(2)}` },
            { key: "blocked", title: "Blocked", render: (r)=> (
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                r.blocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
                {r.blocked ? "Yes" : "No"}
              </span>
            )}
          ]}
          data={list}
          onRowClick={handleRowClick}
          filterable
          filters={[
            {
              key: 'blocked',
              label: 'Blocked',
              options: [
                { value: 'false', label: 'Active' },
                { value: 'true', label: 'Blocked' }
              ]
            }
          ]}
        />
      }
    </div>
  );
}
