import React from "react";
export default function Modal({ children, onClose }){
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded w-11/12 max-w-2xl">
        <div className="flex justify-end"><button onClick={onClose} className="text-sm">Close</button></div>
        {children}
      </div>
    </div>
  );
}
