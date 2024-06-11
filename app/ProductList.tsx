import React from 'react';
import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import Image from 'next/image';

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
};

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/products');
      setProducts(response.data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className="product-container">
          <h2>{product.title}</h2>
          <p className="product-description">{product.description}</p>
          <p>Price: ${product.price.toFixed(2)}</p>
          {isValidUrl(product.image) ? (
            <Image
              src={product.image}
              alt={product.title}
              width={48}
              height={48}
              className="product-image"
            />
          ) : (
            <p>Invalid image URL</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
