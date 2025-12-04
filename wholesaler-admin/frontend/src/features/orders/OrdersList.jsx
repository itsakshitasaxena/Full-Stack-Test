import React, { useEffect, useState } from "react";
import * as api from "../../api/admin";
import Table from "../../components/Table";
import OrderDetail from "./OrderDetail";

export default function OrdersList(){
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState(null);
  useEffect(()=> { api.listOrders().then(setOrders); }, []);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Orders</h3>
      <Table
        columns={[
          { key: "id", title: "Order ID" },
          { key: "buyer_name", title: "Buyer" },
          { key: "total_qty", title: "Qty" },
          { key: "total_amount", title: "Amount" },
          { key: "status", title: "Status" },
        ]}
        data={orders}
        onRowClick={(r)=> setView(r)}
      />
      {view && <div className="mt-4 bg-white p-4 border rounded">
        <OrderDetail order={view} onClose={()=> setView(null)} onUpdated={()=> api.listOrders().then(setOrders)} />
      </div>}
    </div>
  );
}
