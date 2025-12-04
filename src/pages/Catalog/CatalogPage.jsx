import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { endpoints } from "../../api/endpoints";
import CatalogTable from "../../components/tables/CatalogTable";
import { useCart } from "../../context/useCart";
import { Link } from "react-router-dom";

export default function CatalogPage(){
  const [products, setProducts] = useState([]);
  const { addItem } = useCart();

  useEffect(()=> {
    (async ()=>{
      try {
        const res = await api.get(endpoints.products);
        setProducts(res.data || []);
      } catch(e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Catalog</h1>
        <Link to="/cart" className="px-3 py-1 bg-blue-600 text-white rounded">View Cart</Link>
      </div>

      <CatalogTable products={products} onAdd={(p)=> addItem(p, p.min_moq || 1)} />
    </div>
  );
}
