import React from "react";
import Link from "next/link";
import { getCategory, getProductsByCategory } from "@/sanity/lib/data";
import ProductCard from "@/components/ProductCard";
import { ProductCardType } from "@/lib/type";

export default async function CategoryPage({ params }: {params: Promise<{slug: string}>}) {
  const slug = (await params).slug;
  const category = await getCategory(slug);
  const products = await getProductsByCategory(slug);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Category not found
          </h1>
          <p className="text-gray-600 mb-6">
            We couldn&apos;t find the category you were looking for.
          </p>
          <Link
            href="/category"
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {category.title}
          </h1>
          {category.description && (
            <p className="mt-2 text-gray-600 max-w-3xl">
              {category.description}
            </p>
          )}
          <div className="mt-4">
            <Link href="/category" className="text-primary hover:underline">
              &larr; All Categories
            </Link>
          </div>
        </div>

        {/* Products in this category */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Products in {category.title}
          </h2>
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p: ProductCardType) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-600">
                No products available in this category yet.
              </p>
              <div className="mt-6">
                <Link
                  href="/products"
                  className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  View All Products
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
