import React from 'react';
import ProductSkeleton from '@/components/ProductSkeleton';

export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-64 animate-pulse"></div>
        </div>

        {/* Search Bar Skeleton */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Skeleton */}
          <div className="lg:w-64 flex-shrink-0 order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-8 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid Skeleton */}
          <div className="flex-1 order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(6)].map((_, i) => (
                <ProductSkeleton key={i} viewMode="grid" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
