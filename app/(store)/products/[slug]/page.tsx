'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { getProduct, getProductsByCategory } from '@/sanity/lib/data'
import ProductDetailActions from '@/components/ProductDetailActions'
import { notFound } from 'next/navigation'
import { urlFor } from '@/sanity/lib/image'
import { ProductWithCategory, ProductCardType } from '@/lib/type'
import ProductCard from '@/components/ProductCard'
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
  const bulkSelectRef = useRef<HTMLSelectElement | null>(null)
  const [similarProducts, setSimilarProducts] = useState<ProductCardType[]>([])
  const [loadingSimilar, setLoadingSimilar] = useState(false)

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

  // Load similar products from same category
  useEffect(() => {
    const fetchSimilar = async () => {
      if (!product?.category?.slug?.current) return
      setLoadingSimilar(true)
      try {
        const results = await getProductsByCategory(product.category.slug.current)
        const filtered = Array.isArray(results)
          ? results.filter((p: ProductCardType) => p._id !== product._id).slice(0, 8)
          : []
        setSimilarProducts(filtered)
      } catch (e) {
        console.error('Error fetching similar products:', e)
        setSimilarProducts([])
      } finally {
        setLoadingSimilar(false)
      }
    }
    fetchSimilar()
  }, [product])

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
      // const validQuantity = Math.max(1, Math.min(newQuantity, product.stockQuantity))
      // setQuantity(validQuantity)
      setQuantity(newQuantity)
      
      // Update cart if item is already in cart
      const cartQuantity = getItemQuantity(product._id)
      if (cartQuantity > 0) {
        setIsUpdatingQuantity(true)
        try {
          // updateQuantity(product._id, validQuantity)
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
              <div className='mt-3 flex flex-wrap justify-start gap-2 p-2 overflow-x-auto'>
                {allImages.map((image, index) => (
                  <div 
                    key={index} 
                    className={`rounded-xl shadow-sm overflow-hidden cursor-pointer transition-all duration-200 relative h-20 sm:h-32 aspect-square ${
                      selectedImageIndex === index 
                        ? 'ring-2 ring-blue-500 ring-offset-2' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => handleImageClick(index)}
                  >
                    <Image 
                      src={image ? urlFor(image).url() : "/next.svg"} 
                      alt={product.title} 
                      fill 
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


            {/* Quantity Controls */}
            <div className="mt-6">
              <div className="flex flex-col sm:flex-row gap-8">
                {/* Quantity Selector */}
                <div>
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
                      disabled={isUpdatingQuantity}
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

                {/* Bulk Quantity Selector */}
                <div>
                  <label htmlFor="bulkQuantity" className="block text-sm font-medium text-gray-700 mb-2">
                    Bulk quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <select
                      id="bulkQuantity"
                      ref={bulkSelectRef}
                      className="sm:w-full h-10 px-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 w-2/3 focus:ring-primary focus:border-transparent"
                      defaultValue=""
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val)) {
                          handleQuantityChange(val);
                        }
                      }}
                    >
                      <option value="" disabled>
                        Select bulk quantity
                      </option>
                      <option value="100">100</option>
                      <option value="200">200</option>
                      <option value="300">300</option>
                      <option value="400">400</option>
                    </select>
                    {quantity > 1 && (
                      <button
                        type="button"
                        className="text-xs text-gray-600 hover:text-gray-800 hover:underline whitespace-nowrap"
                        onClick={() => {
                          if (bulkSelectRef.current) bulkSelectRef.current.value = "";
                          handleQuantityChange(1);
                        }}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Quickly set the quantity for bulk orders.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Content */}
            {product.content && (
              <div className="mt-6 prose prose-sm max-w-none">
                <div className="text-gray-700 leading-relaxed">
                  {typeof product.content === 'string' ? (
                    <p>{product.content}</p>
                  ) : Array.isArray(product.content) ? (
                    <div>
                      {(product.content as Array<{ 
                        _type?: string; 
                        children?: Array<{ 
                          text?: string; 
                          marks?: string[];
                          _type?: string;
                        }> 
                      }>).map((block, index: number) => {
                        if (block._type === 'block') {
                          return (
                            <p key={index} className="mb-4">
                              {block.children?.map((child, childIndex: number) => {
                                let textElement = <span key={childIndex}>{child.text}</span>;
                                
                                // Apply formatting based on marks
                                if (child.marks && child.marks.length > 0) {
                                  child.marks.forEach((mark: string) => {
                                    switch (mark) {
                                      case 'strong':
                                        textElement = <strong key={childIndex}>{textElement}</strong>;
                                        break;
                                      case 'em':
                                        textElement = <em key={childIndex}>{textElement}</em>;
                                        break;
                                      case 'underline':
                                        textElement = <u key={childIndex}>{textElement}</u>;
                                        break;
                                      case 'strike-through':
                                        textElement = <del key={childIndex}>{textElement}</del>;
                                        break;
                                      case 'code':
                                        textElement = <code key={childIndex} className="bg-gray-100 px-1 py-0.5 rounded text-sm">{textElement}</code>;
                                        break;
                                    }
                                  });
                                }
                                
                                return textElement;
                              })}
                            </p>
                          );
                        }
                        return null;
                      })}
                    </div>
                  ) : (
                    <p>{String(product.content)}</p>
                  )}
                </div>
              </div>
            )}

            {/* Upload Guidance */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-900">Upload your design</h3>
              <p className="text-sm text-gray-600 mt-1">
                Click the &ldquo;Upload Print&rdquo; button to attach the artwork or design you&apos;d like us to print.
              </p>
            </div>

            <div className="mt-4">
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

      {/* Similar Products */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customers also printed these similar products</h2>
        {loadingSimilar ? (
          <div className="text-gray-600">Loading similar products...</div>
        ) : similarProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {similarProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No similar products found.</p>
        )}
      </section>
    </div>
  )
}
