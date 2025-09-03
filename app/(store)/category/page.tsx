import React from 'react'
import Link from 'next/link'
import { getCategories } from '@/sanity/lib/data'
import Categories from '@/components/Categories'

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">All Categories</h1>
          <p className="mt-2 text-gray-600">Browse our categories to find what you need</p>
        </div>

        {categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Categories categories={categories} />
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500">No categories available at the moment.</p>
            <div className="mt-6">
              <Link href="/products" className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                View Products
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
