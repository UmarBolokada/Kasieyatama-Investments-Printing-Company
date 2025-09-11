"use client";
import React from "react";
import { Trash2Icon, MinusIcon, PlusIcon, ArrowLeftIcon } from "lucide-react";
import { useCart } from "@/lib/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";

function CartList() {
  const { state, removeItem, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    try {
      updateQuantity(itemId, newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
      // You could show a toast notification here
    }
  };

  const handleRemoveItem = (itemId: string) => {
    const item = state.items.find(item => item._id === itemId);
    if (item && confirm(`Are you sure you want to remove "${item.title}" from your cart?`)) {
      removeItem(itemId);
    }
  };

  const handleClearCart = () => {
    if (confirm("Are you sure you want to clear your cart?")) {
      clearCart();
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 text-gray-400 mb-6">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
              />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Looks like you haven&apos;t added any products to your cart yet. Start shopping to add some items!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Browse Products
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
        <button
          onClick={handleClearCart}
          className="text-sm text-red-600 hover:text-red-800 transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="space-y-4">
        {state.items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
          >
            {/* Mobile Layout */}
            <div className="flex flex-col sm:hidden space-y-4">
              {/* Top Row: Image, Title, Delete */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                    <Image
                      src={item.mainImage}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.slug}`} className="block">
                    <h3 className="text-base font-medium text-gray-900 hover:text-primary transition-colors overflow-hidden" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 mt-1">
                    Le{item.price.toFixed(2)} each
                  </p>
                  <p className="text-xs text-gray-400">
                    {item.stockQuantity} available
                  </p>
                </div>
                
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2Icon className="w-5 h-5" />
                </button>
              </div>
              
              {/* Bottom Row: Quantity and Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700">Qty:</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.stockQuantity}
                      className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    Le{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:flex items-center space-x-4">
              {/* Product Image */}
              <div className="flex-shrink-0">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                  <Image
                    src={item.mainImage}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <Link href={`/product/${item.slug}`} className="block">
                  <h3 className="text-lg font-medium text-gray-900 hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 mt-1">
                  Le{item.price.toFixed(2)} each
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {item.stockQuantity} available
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    handleQuantityChange(item._id, item.quantity - 1)
                  }
                  disabled={item.quantity <= 1}
                  className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-medium text-gray-900">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    handleQuantityChange(item._id, item.quantity + 1)
                  }
                  disabled={item.quantity >= item.stockQuantity}
                  className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="text-lg font-medium text-gray-900">
                  Le{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemoveItem(item._id)}
                className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 transition-colors"
                aria-label="Remove item"
              >
                <Trash2Icon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartList;
