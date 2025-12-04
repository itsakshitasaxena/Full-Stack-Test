import React from "react";
import CsvUpload from "../../components/CsvUpload";
import * as api from "../../api/admin";

export default function CsvInventoryUpload({ onUploaded }){
  const handlePreview = (rows) => {
    console.log("preview", rows.slice(0,5));
  }
  const handleUpload = async (fd) => {
    await api.uploadInventoryCsv(fd);
    alert("CSV uploaded");
    onUploaded();
  }

  return <CsvUpload onPreview={handlePreview} onUpload={handleUpload} />;
}
