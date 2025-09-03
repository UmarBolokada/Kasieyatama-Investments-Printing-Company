import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Category } from '@/lib/type'
import { urlFor } from '@/sanity/lib/image'

function Categories({categories}: {categories: Category[]}) {
  
  return (
    <>
    {categories?.length > 0 && categories?.map((category:Category) => (
        <Link key={category._id}
                  href={`/category/${category.slug.current}`}
                  className="group block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <div className="relative h-48">
                    {category.image ? (
                      <Image
                        src={urlFor(category.image).url() || ''}
                        alt={category.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">{category.title[0]}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    {category.description && (
                      <p className="text-gray-600 mt-2 line-clamp-2">
                        {category.description}
                      </p>
                    )}
                  </div>
                </Link>
    ))}
    </>
  )
}

export default Categories