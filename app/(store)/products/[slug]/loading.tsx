import React from 'react'

export default function ProductLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="container mx-auto px-4 py-10 md:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
            <div className="aspect-square bg-gray-200" />
          </div>
          <div className="space-y-4">
            <div className="h-8 w-2/3 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-24 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </section>
    </div>
  )
}
