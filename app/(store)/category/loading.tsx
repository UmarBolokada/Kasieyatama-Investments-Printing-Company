import React from 'react'

export default function CategoriesLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-8 text-center">
          <div className="h-8 w-48 bg-gray-200 rounded mx-auto animate-pulse" />
          <div className="h-4 w-72 bg-gray-200 rounded mx-auto mt-2 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-40 w-full bg-gray-200 rounded" />
              <div className="h-5 w-1/2 bg-gray-200 rounded mt-4" />
              <div className="h-4 w-2/3 bg-gray-200 rounded mt-2" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
