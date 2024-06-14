'use client';

import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { uploadFile } from '../uploadService';

type ProductFormProps = {
  onProductCreated: (product: Product) => void;
};

type Product = {
  id: number;
  title: string;
  prices: number;
  location_date: string;
  imag: string;
};

const ProductForm: React.FC<ProductFormProps> = ({ onProductCreated }) => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location_date, setLoc] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = '';

    if (imageFile) {
      try {
        imageUrl = await uploadFile(imageFile);
      } catch (error) {
        setMessage('Failed to upload image.');
        return;
      }
    }

    const product = { title, price: parseFloat(price), location_date, imag: imageUrl };

    try {
      const response = await axiosInstance.post('/', product);
      setMessage('Product created successfully!');
      onProductCreated(response.data);
    } catch (error) {
      console.error('Error creating product:', error);
      setMessage('Failed to create product.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded hover:border-gray-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Price</label>
        <input
          type="number"
          step="10"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full p-2 border rounded hover:border-gray-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Location_date</label>
        <textarea
          value={location_date}
          onChange={(e) => setLoc(e.target.value)}
          required
          className="w-full p-2 border rounded hover:border-gray-500"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
          className="w-full p-2 border rounded hover:border-gray-500"
        />
      </div>

      <button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg">
        Create Product
      </button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </form>
  );
};

export default ProductForm;
