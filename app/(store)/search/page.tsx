import React from 'react'
import {  searchProducts } from '@/sanity/lib/data'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import { ProductCardType } from '@/lib/type'

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{q: string, query: string}>
}) {
  const raw = (await searchParams).q ?? (await searchParams).query ?? ''
  const query = Array.isArray(raw) ? raw[0] : raw
  const trimmedQuery = (query || '').trim()

  const products = trimmedQuery ? await searchProducts(trimmedQuery) : []

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Search</h1>
          <p className="text-gray-600">Find products by name, description, or tags.</p>
        </div>

        {/* Search form */}
        <form action="/search" method="get" className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              name="q"
              defaultValue={trimmedQuery}
              placeholder="Search products..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              aria-label="Search products"
            />
            <button type="submit" className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
              Search
            </button>
          </div>
        </form>

        {/* Results */}
        {trimmedQuery ? (
          <div>
            <div className="mb-4 text-gray-700">
              Showing {products.length} result{products.length === 1 ? '' : 's'} for <span className="font-semibold text-gray-900">&quot;{trimmedQuery}&quot;</span>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p: ProductCardType) => (
                <ProductCard key={p._id} product={p} />
              ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <p className="text-gray-600">No products matched your search.</p>
                <p className="text-gray-500 mt-1">Try different keywords or check your spelling.</p>
                <Link href="/products" className="inline-block mt-6 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                  Browse all products
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">What are you looking for?</h2>
            <p className="text-gray-600 mt-2">Start by entering a keyword above.</p>
          </div>
        )}
      </section>
    </div>
  )
}