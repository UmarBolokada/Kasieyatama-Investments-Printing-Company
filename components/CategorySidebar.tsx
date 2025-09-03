"use client";

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon, ChevronUpIcon } from 'lucide-react';
import { Category } from '@/lib/type';

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory?: string | null;
  onCategorySelect: (categorySlug: string | null) => void;
  className?: string;
}

export default function CategorySidebar({ 
  categories, 
  selectedCategory, 
  onCategorySelect,
  className = ''
}: CategorySidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleCategoryClick = (categorySlug: string) => {
    if (selectedCategory === categorySlug) {
      onCategorySelect(null); // Deselect if same category clicked
    } else {
      onCategorySelect(categorySlug);
    }
  };

  const handleAllProductsClick = () => {
    onCategorySelect(null);
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-500 hover:text-gray-700 transition-colors lg:hidden"
        >
          {isOpen ? (
            <ChevronDownIcon className="w-5 h-5" />
          ) : (
            <ChevronRightIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Categories List */}
      <div className={`space-y-2 ${isOpen ? 'block' : 'hidden lg:block'}`}>
        {/* All Products Option */}
        <button
          onClick={handleAllProductsClick}
          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
            !selectedCategory
              ? 'bg-primary text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          All Products
        </button>

        {/* Category List */}
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => handleCategoryClick(category.slug.current)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
              selectedCategory === category.slug.current
                ? 'bg-primary text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Mobile Toggle */}
      <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          {isOpen ? 'Hide' : 'Show'} Categories
          {isOpen ? (
            <ChevronUpIcon className="w-4 h-4" />
          ) : (
            <ChevronDownIcon className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Mobile Category Pills */}
      <div className="lg:hidden mt-4 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleAllProductsClick}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              !selectedCategory
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {categories.slice(0, 3).map((category) => (
            <button
              key={category._id}
              onClick={() => handleCategoryClick(category.slug.current)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedCategory === category.slug.current
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.title}
            </button>
          ))}
          {categories.length > 3 && (
            <span className="px-3 py-1 text-sm text-gray-500">
              +{categories.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
