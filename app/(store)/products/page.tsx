import React from 'react';
import { client } from '@/sanity/lib/client';
import { productsQuery, categoriesQuery } from '@/sanity/lib/queries';
// import { ProductCardType, Category } from '@/lib/type';
import ShopContent from '@/components/productsContent';

export default async function ShopPage() {
  try {
    // Fetch products and categories on the server
    const [products, categories] = await Promise.all([
      client.fetch(productsQuery),
      client.fetch(categoriesQuery)
    ]);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
            <p className="text-gray-600">Discover our amazing products</p>
          </div>

          {/* Shop Content */}
          <ShopContent products={products} categories={categories} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching shop data:', error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-4">Unable to load products at this time.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
}
