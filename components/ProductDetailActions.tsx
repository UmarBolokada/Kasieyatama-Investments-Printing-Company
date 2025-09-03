"use client";

import React, { useState } from 'react';
import { ShoppingCartIcon, UploadIcon } from 'lucide-react';
import { useCart } from '@/lib/contexts/CartContext';
import { ProductCardType } from '@/lib/type';
import { urlFor } from '@/sanity/lib/image';
import UploadPrintModal from './UploadPrintModal';

interface ProductDetailActionsProps {
  product: ProductCardType;
}

export default function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const { addItem, isInCart, getItemQuantity } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  // const [isWishlisted, setIsWishlisted] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const isInCartItem = isInCart(product._id);
  const cartQuantity = getItemQuantity(product._id);

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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAddToCart}
          disabled={product.stockQuantity === 0 || isLoading}
          className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            isInCartItem ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-primary text-white hover:bg-primary/90'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <ShoppingCartIcon className="w-5 h-5" />
          {isLoading ? 'Adding...' : isInCartItem ? `In Cart (${cartQuantity})` : 'Add to Cart'}
        </button>

        {/* <button
          onClick={() => setIsWishlisted((prev) => !prev)}
          className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
            isWishlisted ? 'border-red-500 text-red-600 bg-red-50' : 'border-gray-300 text-gray-700 hover:bg-gray-100'
          }`}
        >
          <HeartIcon className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
          {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
        </button> */}

        <button
          onClick={() => setIsUploadOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          <UploadIcon className="w-5 h-5" />
          Upload Print
        </button>
      </div>

      <UploadPrintModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </>
  );
}
