"use client";

import React, { useState, useEffect } from 'react';
import { ProductCardType } from '@/lib/type';
import ProductCard from './ProductCard';
import { FilterIcon, Grid3X3Icon, ListIcon } from 'lucide-react';

interface ProductListProps {
  products: ProductCardType[];
  categories: Array<{ _id: string; title: string; slug: { current: string } }>;
  selectedCategory: string | null;
  onCategorySelect: (categorySlug: string | null) => void;
}

export default function ProductList({ products, categories, selectedCategory, onCategorySelect }: ProductListProps) {
  const [filteredProducts, setFilteredProducts] = useState<ProductCardType[]>(products);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on category and search
  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.category?.slug.current === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery]);

  const clearFilters = () => {
    onCategorySelect(null);
    setSearchQuery('');
  };

  return (
    <div className="flex-1 order-1 lg:order-2 min-w-0">
              {/* Search and Filters Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 sticky top-0 z-10">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="flex-1 w-full sm:max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  aria-label="Search products"
                />
                <FilterIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Grid View"
            >
              <Grid3X3Icon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="List View"
            >
              <ListIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Clear Filters */}
          {(selectedCategory || searchQuery) && (
            <button
              onClick={clearFilters}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors hover:bg-gray-100 rounded-lg"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
          {selectedCategory && (
            <span className="text-primary font-medium">
              {' '}in {categories.find(c => c.slug.current === selectedCategory)?.title}
            </span>
          )}
        </p>
      </div>

      {/* Products Display */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <FilterIcon className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'
            : 'space-y-4'
        }>
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
}
