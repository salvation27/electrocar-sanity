import { Alert, CircularProgress } from '@mui/material';
import React,{useEffect,useState} from 'react'
import { client } from '../utils/client';
import ProductItem from './ProductItem';

const SaleItem = () => {
    const [actionProduct, setActionProduct] = useState({
      products: [],
      error: "",
      loading: true,
    });
    const { loading, products, error } = actionProduct;
        const query = `*[_type == "product" && released]`;
        const fetchDataOne = async () => {
          try {
            const productData = await client.fetch(query);
            setActionProduct({ products: productData, loading: false });
          } catch (error) {
            setActionProduct({
              error: error.message,
              loading: false,
            });
          }
        };
  useEffect(() => {
    fetchDataOne();
  }, []);

  return (
    <div>
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

export default SaleItem