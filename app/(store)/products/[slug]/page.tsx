'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { getProduct } from '@/sanity/lib/data'
import ProductDetailActions from '@/components/ProductDetailActions'
import { notFound } from 'next/navigation'
import { urlFor } from '@/sanity/lib/image'
import { ProductWithCategory } from '@/lib/type'
import { useCart } from '@/lib/contexts/CartContext'

interface ProductPageProps {
  params: Promise<{slug: string}>
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<ProductWithCategory | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isUpdatingQuantity, setIsUpdatingQuantity] = useState(false)
  const { getItemQuantity, updateQuantity } = useCart()

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const resolvedParams = await params
        const productData = await getProduct(resolvedParams.slug)
        if (!productData) {
          notFound()
          return
        }
        setProduct(productData)
        setQuantity(1) // Reset quantity when product changes
      } catch (error) {
        console.error('Error fetching product:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [params])

  // Sync quantity with cart when product changes
  useEffect(() => {
    if (product) {
      const cartQuantity = getItemQuantity(product._id)
      if (cartQuantity > 0) {
        setQuantity(cartQuantity)
      }
    }
  }, [product, getItemQuantity])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) return notFound()

  const discountPercentage = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  // Create array of all images (main image + additional images)
  const allImages = [
    product.mainImage,
    ...(product.images || [])
  ].filter(Boolean)

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index)
  }

  const handleQuantityChange = async (newQuantity: number) => {
    if (product) {
      // Ensure quantity is within valid bounds
      const validQuantity = Math.max(1, Math.min(newQuantity, product.stockQuantity))
      setQuantity(validQuantity)
      
      // Update cart if item is already in cart
      const cartQuantity = getItemQuantity(product._id)
      if (cartQuantity > 0) {
        setIsUpdatingQuantity(true)
        try {
          updateQuantity(product._id, validQuantity)
        } catch (error) {
          console.error('Error updating quantity:', error)
          // Revert quantity on error
          setQuantity(cartQuantity)
        } finally {
          setIsUpdatingQuantity(false)
        }
      }
    }
  }

  const handleQuantityIncrement = async () => {
    if (product && quantity < product.stockQuantity) {
      const newQuantity = quantity + 1
      setQuantity(newQuantity)
      
      // Update cart if item is already in cart
      const cartQuantity = getItemQuantity(product._id)
      if (cartQuantity > 0) {
        setIsUpdatingQuantity(true)
        try {
          updateQuantity(product._id, newQuantity)
        } catch (error) {
          console.error('Error updating quantity:', error)
          // Revert quantity on error
          setQuantity(cartQuantity)
        } finally {
          setIsUpdatingQuantity(false)
        }
      }
    }
  }

  const handleQuantityDecrement = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      
      // Update cart if item is already in cart
      const cartQuantity = getItemQuantity(product._id)
      if (cartQuantity > 0) {
        setIsUpdatingQuantity(true)
        try {
          updateQuantity(product._id, newQuantity)
        } catch (error) {
          console.error('Error updating quantity:', error)
          // Revert quantity on error
          setQuantity(cartQuantity)
        } finally {
          setIsUpdatingQuantity(false)
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Images */}
          <div className="">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden w-full relative h-96">
              <Image
                src={allImages[selectedImageIndex] ? urlFor(allImages[selectedImageIndex]).url() : '/next.svg'}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            {allImages.length > 1 && (
              <div className='mt-3 flex justify-start gap-2 overflow-x-auto'>
                {allImages.map((image, index) => (
                  <div 
                    key={index} 
                    className={`rounded-xl shadow-sm overflow-hidden cursor-pointer transition-all duration-200 ${
                      selectedImageIndex === index 
                        ? 'ring-2 ring-blue-500 ring-offset-2' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => handleImageClick(index)}
                  >
                    <Image 
                      src={image ? urlFor(image).url() : "/next.svg"} 
                      alt={product.title} 
                      width={100} 
                      height={100} 
                      className='object-cover object-center' 
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            {product.category?.title && (
              <p className="mt-1 text-sm text-gray-600">Category: {product.category.title}</p>
            )}

            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-900">Le{product.price.toFixed(2)}</span>
              {product.compareAtPrice && (
                <span className="text-gray-500 line-through">Le{product.compareAtPrice.toFixed(2)}</span>
              )}
              {discountPercentage > 0 && (
                <span className="text-sm font-semibold text-red-600">-{discountPercentage}%</span>
              )}
            </div>

            <div className="mt-2">
              {product.stockQuantity > 0 ? (
                <span className="text-sm text-green-600">In Stock ({product.stockQuantity} available)</span>
              ) : (
                <span className="text-sm text-red-600">Out of Stock</span>
              )}
            </div>

            {/* Quantity Selector */}
            {product.stockQuantity > 0 && (
              <div className="mt-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleQuantityDecrement}
                    disabled={quantity <= 1 || isUpdatingQuantity}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Decrease quantity"
                  >
                    {isUpdatingQuantity ? (
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    )}
                  </button>
                  
                  <div className="relative">
                    <input
                      id="quantity"
                      type="number"
                      min="1"
                      max={product.stockQuantity}
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      disabled={isUpdatingQuantity}
                      className="w-20 h-10 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
                    />
                    {isUpdatingQuantity && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={handleQuantityIncrement}
                    disabled={quantity >= product.stockQuantity || isUpdatingQuantity}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label="Increase quantity"
                  >
                    {isUpdatingQuantity ? (
                      <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Total: Le{(product.price * quantity).toFixed(2)}
                </p>
              </div>
            )}

            <div className="mt-6 prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <div className="mt-6">
              <ProductDetailActions 
                product={{
                  _id: product._id,
                  title: product.title,
                  slug: product.slug,
                  description: product.description || '',
                  mainImage: product.mainImage,
                  price: product.price,
                  compareAtPrice: product.compareAtPrice,
                  stockQuantity: product.stockQuantity,
                  category: product.category,
                  tags: product.tags
                }}
                quantity={quantity}
              />
            </div>
          </div>
        </div>

        {/* You might also like */}
        {/* Optional section could be added later */}
      </section>
    </div>
  )
}
