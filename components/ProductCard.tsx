"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCartIcon } from 'lucide-react';
import { useCart } from '@/lib/contexts/CartContext';
import { ProductCardType } from '@/lib/type';
import { urlFor } from '@/sanity/lib/image';

interface ProductCardProps {
  product: ProductCardType;
  viewMode?: 'grid' | 'list'
}

export default function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const { addItem, isInCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  // const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = async () => {
    if (product.stockQuantity === 0) return;
    
    setIsLoading(true);
    try {
      addItem({
        _id: product._id,
        title: product.title,
        price: product.price,
        mainImage: urlFor(product.mainImage).url(),
        slug: product.slug.current,
        stockQuantity: product.stockQuantity,
        quantity: 1,
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      // You could show a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  // const handleWishlist = () => {
  //   setIsWishlisted(!isWishlisted);
  //   // TODO: Implement wishlist functionality
  // };

  const discountPercentage = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  const isInCartItem = isInCart(product._id);

  return (
    <div className={`group relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${
      viewMode === 'list' ? 'flex' : ''
    }`}>
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          -{discountPercentage}%
        </div>
      )}

      {/* Wishlist Button */}
      {/* <button
        onClick={handleWishlist}
        className="absolute top-2 right-2 z-10 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
      >
        <HeartIcon 
          className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
        />
      </button> */}

             {/* Product Image */}
       <Link href={`/products/${product.slug.current}`} className="block">
         <div className={`relative overflow-hidden ${
           viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : 'aspect-square'
         }`}>
           <Image
             src={urlFor(product.mainImage).url()}
             alt={product.title}
             fill
             className="object-cover group-hover:scale-105 transition-transform duration-300"
           />
         </div>
       </Link>

      {/* Product Info */}
      <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        {/* Category */}
        {product.category && (
          <Link 
                href={`/category/${product.category.slug.current}`}
            className="text-xs text-gray-500 hover:text-primary transition-colors"
          >
            {product.category.slug.current}

          </Link>
        )}

        {/* Title */}
        <Link href={`/products/${product.slug.current}`}>
          <h3 className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2 mt-1">
            {product.title}
          </h3>
        </Link>
        
        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xl font-bold text-gray-900">
            Le{product.price.toFixed(2)}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-gray-500 line-through">
              Le{product.compareAtPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="mt-2">
          {product.stockQuantity > 0 ? (
            <span className="text-sm text-green-600">
              In Stock ({product.stockQuantity} available)
            </span>
          ) : (
            <span className="text-sm text-red-600">
              Out of Stock
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <div className="mt-4">
          {product.stockQuantity > 0 ? (
            <button
              onClick={handleAddToCart}
              disabled={isLoading || isInCartItem}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isInCartItem
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary/90'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <ShoppingCartIcon className="w-4 h-4" />
              {isLoading ? (
                'Adding...'
              ) : isInCartItem ? (
                'Already in cart'
              ) : (
                'Add to Cart'
              )}
            </button>
          ) : (
            <button
              disabled
              className="w-full px-4 py-2 rounded-lg font-medium bg-gray-300 text-gray-500 cursor-not-allowed"
            >
              Out of Stock
            </button>
          )}
        </div>

        {/* Tags */}
        {/* {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
} 