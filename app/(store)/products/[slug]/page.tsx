import React from 'react'
import Image from 'next/image'
import { getProduct } from '@/sanity/lib/data'
import ProductDetailActions from '@/components/ProductDetailActions'
import { notFound } from 'next/navigation'
import { urlFor } from '@/sanity/lib/image'


export default async function ProductPage({ params }: {params: Promise<{slug: string}>}) {
  const product = await getProduct((await params).slug)
  if (!product) return notFound()

  const discountPercentage = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Images */}
          <div className="">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden w-full relative h-96">
              <Image
                src={product.mainImage ? urlFor(product.mainImage).url() : '/next.svg'}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            {product.images.length && <div className='mt-3 flex justify-center gap-2'>
            {product.images.map((el:string, i:string) => <div key={el+i} className='rounded-xl shadow-sm overflow-hidden'> <Image src={el ? urlFor(el).url() : "/next.svg"} alt={product.title} width={200} height={400} className='object-cover object-center' /> </div>)}
            </div>}
          </div>

          {/* Content */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            {product.category?.title && (
              <p className="mt-1 text-sm text-gray-600">Category: {product.category.title}</p>
            )}

            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {product.compareAtPrice && (
                <span className="text-gray-500 line-through">${product.compareAtPrice.toFixed(2)}</span>
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

            <div className="mt-6 prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <div className="mt-6">
              <ProductDetailActions product={product} />
            </div>
          </div>
        </div>

        {/* You might also like */}
        {/* Optional section could be added later */}
      </section>
    </div>
  )
}
