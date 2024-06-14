// pages/index.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { scrapeOLXData } from '@/utils/scrapeUtils';
import axiosInstance from '../axiosInstance';
import ProductForm from './ProductForm';
import Image from 'next/image';

const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

const HomePage = () => {
    const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [recentPostCount, setRecentPostCount] = useState(0);

  const handleProductCreated = (newProduct) => {
    setListings([newProduct, ...listings]);
    setIsFormVisible(false); // Hide the form after product creation
};

    useEffect(() => {
        const fetchData = async () => {
            const scrapedData = await scrapeOLXData();
            if (scrapedData) {
                setListings(scrapedData);
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        const countRecentPosts = (listings, minutes) => {
            const now = new Date();
            const threshold = new Date(now.getTime() - minutes * 60000);
            
            const recentPosts = listings.filter(listing => {
                const postDate = new Date(listing.location_date); // Adjust parsing if needed
                return postDate > threshold;
            });

            return recentPosts.length;
        };

        const minutes = 30;
        const recentPosts = countRecentPosts(listings, minutes);
        setRecentPostCount(recentPosts);
    }, [listings]);

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
           <p>Number of posts in the last 30 minutes: {recentPostCount}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((list, index) => (
              <div className="product-container bg-white p-4 rounded-lg shadow-md">
                
                <h2 className="text-xl font-semibold mb-2">{list.title}</h2>
                <p className="product-description">{list.location_date[index]}</p>
                <p className=" font-bold text-lg mt-2">Price: {list.prices[index]}</p>
                <img src={list.imag[index]} alt={list.title} width={200} height={200} className="product-image rounded-md object-cover" />
                
              </div>
            ))}
          </div>
        </div>
      );
};

export default HomePage;
