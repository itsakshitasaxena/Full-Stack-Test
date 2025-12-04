import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import { endpoints } from "../../api/endpoints";
import ProductDetail from "../../components/product/ProductDetail";

export default function ProductPage(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(()=> {
    (async ()=> {
      const res = await api.get(endpoints.product(id));
      setProduct(res.data);
    })();
  }, [id]);

  if (!product) return <div>Loading...</div>;
  return <ProductDetail product={product} />;
}
