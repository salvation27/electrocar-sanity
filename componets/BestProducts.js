import { Alert, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import ProductItem from "./ProductItem";
import { client } from "../utils/client";

const BestProducts = () => {
      const [state, setState] = useState({
        products: [],
        error: "",
        loading: true,
      });
      const { products, error, loading } = state;
      const query = `*[_type == "product" && best]`;
       const fetchData = async () => {
         try {
           const productsData = await client.fetch(query);
           setState({
             products: productsData,
             loading: false,
           });
         } catch (error) {
           console.log("Ошибка при получении данніх в компоненте Home");
           setState({
             error: error.message,
             loading: false,
           });
         }
       };
         useEffect(() => {
           fetchData();
         }, []);
  return (
    <div>
      <div className="title">Best Products</div>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <div className="product_wrap">
          {products.map((item) => (
            <ProductItem key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BestProducts