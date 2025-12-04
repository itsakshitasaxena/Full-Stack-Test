import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchAccounts, bulkApproveAccounts } from "./accountsSlice";

export default function AccountsList(){
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector((s)=> s.accounts);
  const [selected, setSelected] = useState({});

  useEffect(()=> { dispatch(fetchAccounts()); }, [dispatch]);

  const toggle = (row, checked) => setSelected(prev => ({ ...prev, [row.id]: checked }));

  const handleBulkAction = (action, ids) => {
    if (action === 'approve') {
      dispatch(bulkApproveAccounts(ids));
      setSelected({});
    } else if (action === 'reject') {
      // Implement reject logic
      alert(`Rejected accounts: ${ids.join(', ')}`);
      setSelected({});
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Account Approvals</h2>
      </div>

      {loading ? <div className="text-center py-8">Loading...</div> :
        <Table
          columns={[
            { key: "company_name", title: "Company" },
            { key: "contact_name", title: "Contact" },
            { key: "tax_id", title: "GST/Tax ID" },
            { key: "status", title: "Status", render: (r) => (
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                r.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                r.status === 'approved' ? 'bg-green-100 text-green-800' :
                r.status === 'rejected' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {r.status}
              </span>
            )}
          ]}
          data={list}
          selectable
          selectedMap={selected}
          onSelect={toggle}
          onRowClick={(r)=> alert(JSON.stringify(r, null, 2))}
          bulkActions={[
            { key: 'approve', label: 'Approve', className: 'bg-green-500 text-white hover:bg-green-600' },
            { key: 'reject', label: 'Reject', className: 'bg-red-500 text-white hover:bg-red-600' }
          ]}
          onBulkAction={handleBulkAction}
          filterable
          filters={[
            {
              key: 'status',
              label: 'Status',
              options: [
                { value: 'pending', label: 'Pending' },
                { value: 'approved', label: 'Approved' },
                { value: 'rejected', label: 'Rejected' }
              ]
            }
          ]}
        />
      }
    </div>
  );
}
