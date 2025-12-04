import React, { useEffect, useState } from "react";
import * as api from "../../api/admin";
import Table from "../../components/Table";
import CsvInventoryUpload from "./CsvInventoryUpload";

export default function InventoryList(){
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    api.listInventory().then(setItems).finally(() => setLoading(false));
  }, []);

  const refresh = () => {
    setLoading(true);
    api.listInventory().then(setItems).finally(() => setLoading(false));
  };

  const handleRowClick = (r) => {
    const newQty = Number(prompt("Adjust stock", String(r.stock)));
    if(!Number.isNaN(newQty)) {
      api.updateInventory(r.sku, { stock: newQty }).then(refresh);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Inventory Management</h3>
        <CsvInventoryUpload onUploaded={refresh} />
      </div>

      {loading ? <div className="text-center py-8">Loading...</div> :
        <Table
          columns={[
            { key: "sku", title: "SKU" },
            { key: "name", title: "Name" },
            { key: "stock", title: "Stock", render: (r) => (
              <span className={r.stock <= r.threshold ? 'text-red-600 font-semibold' : ''}>
                {r.stock}
              </span>
            )},
            { key: "threshold", title: "Reorder Threshold" },
            { key: "location", title: "Location" },
          ]}
          data={items}
          onRowClick={handleRowClick}
          filterable
          filters={[
            {
              key: 'location',
              label: 'Location',
              options: [
                { value: 'warehouse-a', label: 'Warehouse A' },
                { value: 'warehouse-b', label: 'Warehouse B' },
                { value: 'store', label: 'Store' }
              ]
            }
          ]}
        />
      }
    </div>
  );
}
