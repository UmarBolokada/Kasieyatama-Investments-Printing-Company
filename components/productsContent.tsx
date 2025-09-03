"use client";

import React, { useState } from 'react';
import { ProductCardType, Category } from '@/lib/type';
import CategorySidebar from './CategorySidebar';
import ProductList from './ProductList';

interface ShopContentProps {
  products: ProductCardType[];
  categories: Category[];
}

export default function ShopContent({ products, categories }: ShopContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Category Sidebar */}
      <div className="lg:w-64 flex-shrink-0 order-2 lg:order-1">
        <CategorySidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
      </div>

      {/* Product List */}
      <ProductList 
        products={products} 
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
    </div>
  );
}
