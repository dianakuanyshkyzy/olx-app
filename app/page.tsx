'use client';

import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import ProductForm from './ProductForm';
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

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

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

  const handleProductCreated = (newProduct: Product) => {
    setProducts([newProduct, ...products]);
    setIsFormVisible(false); // Hide the form after product creation
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Products</h1>
      <div className="flex justify-center mb-6">
        <button
          className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md"
          onClick={() => setIsFormVisible(!isFormVisible)}
        >
          {isFormVisible ? 'Cancel' : 'Create a Product'}
        </button>
      </div>
      {isFormVisible && (
        <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Create a New Product</h2>
          <ProductForm onProductCreated={handleProductCreated} />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p>{product.description}</p>
            <p className="font-bold text-lg mt-2">Price: ${product.price.toFixed(2)}</p>
            {isValidUrl(product.image) ? (
              <Image src={product.image} alt={product.title} width={200} height={200} className="rounded-md object-cover" />
            ) : (
              <p>Invalid image URL</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
