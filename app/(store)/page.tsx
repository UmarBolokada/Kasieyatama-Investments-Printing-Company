import React, { Suspense } from 'react';
import Link from 'next/link';
import { ArrowRightIcon, StarIcon } from 'lucide-react';
import { getFeaturedProducts, getCategories } from '@/sanity/lib/data';
import ProductCard from '@/components/ProductCard';
import Categories from '@/components/Categories';
import { ProductCardType } from '@/lib/type';
import Hero from '@/components/HeroSwiper';

export default async function HomePage() {
 const featuredProducts = await getFeaturedProducts()
 const categories = await getCategories()


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center rounded-lg p-4 shadow-md bg-blue-100/30 backdrop-blur-md border border-purple-300/30">
              <div className="mx-auto h-16 w-16 bg-blue-100/60 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Turnaround</h3>
              <p className="text-gray-600">Quick delivery on all orders with rush options available</p>
            </div>
            <div className="text-center rounded-lg p-4 shadow-md bg-green-100/30 backdrop-blur-md border border-green-300/30">
              <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">Premium materials and expert craftsmanship in every print</p>
            </div>
            <div className="text-center rounded-lg p-4 shadow-md bg-purple-100/30 backdrop-blur-md border border-purple-300/30">
              <div className="mx-auto h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600">Professional guidance and customer service throughout</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular printing products and services
            </p>
          </div>
          
          <Suspense fallback={<div>Loading...</div>}>
          {featuredProducts && featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.map((product: ProductCardType ) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No featured products available at the moment.</p>
            </div>
          )}
          </Suspense>
          
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              View All Products
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive range of printing services
            </p>
          </div>
          
          <Suspense fallback={<div>Loading...</div>}>
          {categories && categories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Categories categories={categories.slice(0, 3)} />
              </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No services available at the moment.</p>
            </div>
          )}
            </Suspense>
        </div>

        <div className="text-center mt-12">
            <Link
              href="/category"
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              Explore All Services
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Link>
          </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Don&apos;t just take our word for it - hear from our satisfied customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
                             <p className="text-gray-600 mb-4">
                 &ldquo;Excellent quality and fast turnaround. The business cards look professional and the customer service was outstanding.&rdquo;
               </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">Small Business Owner</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
                             <p className="text-gray-600 mb-4">
                 &ldquo;The custom banner printing exceeded my expectations. Great attention to detail and competitive pricing.&rdquo;
               </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold text-gray-900">Mike Chen</p>
                  <p className="text-sm text-gray-500">Marketing Manager</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
                             <p className="text-gray-600 mb-4">
                 &ldquo;Reliable service and consistent quality. They&apos;ve been our go-to printing partner for years.&rdquo;
               </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold text-gray-900">Emily Rodriguez</p>
                  <p className="text-sm text-gray-500">Event Coordinator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                     <p className="text-xl mb-8 max-w-2xl mx-auto">
             Whether you need business cards, banners, or custom printing services, we&apos;re here to help bring your vision to life.
           </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Shop Now
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors"
            >
              Contact Us
              <ArrowRightIcon className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}








{/* <section className="relative min-h-[600px] flex items-center justify-center text-white overflow-hidden"> */}
 {/* Background Image */}
 {/* <div 
   className="absolute inset-0 bg-cover bg-center bg-no-repeat"
   style={{
     backgroundImage: `url('/banner.jpg')`,
   }}
 /> */}
 
 {/* Gradient Overlay */}
 {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/70 to-blue-900/80"></div> */}
 
 {/* Dark Overlay for Better Text Readability */}
 {/* <div className="absolute inset-0 bg-black/40"></div> */}
 
 {/* Content */}
 {/* <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
   <div className="max-w-4xl mx-auto">
     <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
       Professional Printing Services
     </h1>
     <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
       Quality printing solutions for your business. From business cards to banners, 
       we deliver excellence in every print.
     </p>
     <div className="flex flex-col sm:flex-row gap-4 justify-center">
       <Link
         href="/products"
         className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
       >
         Shop Products
         <ArrowRightIcon className="ml-2 w-5 h-5" />
       </Link>
       <SubmitQuoteButton />
     </div>
   </div>
 </div> */}
{/* </section> */}