import React, { useState } from "react";
import CSVUploader from "../../components/ui/CSVUploader";

export default function QuickOrder(){
  const [result, setResult] = useState(null);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Quick Order (CSV)</h1>
      <CSVUploader onComplete={(res)=> setResult(res)} />
      { result && <div className="bg-white p-4 rounded shadow">
         <h3>Result</h3>
         <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
      </div> }
    </div>
  );
}
