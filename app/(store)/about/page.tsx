import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AwardIcon, ShieldCheckIcon, LeafIcon, ClockIcon } from 'lucide-react'

export default async function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-12 md:py-16 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
              Crafting quality prints that bring your ideas to life
            </h1>
            <p className="mt-4 text-gray-600 leading-relaxed">
              We are a full–service printing press committed to premium quality, fast turnaround,
              and exceptional service. From business cards to banners, we help brands make a bold
              and lasting impression.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-white hover:bg-primary/90 transition-colors"
              >
                Explore Products
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg bg-gray-100 px-5 py-2.5 text-gray-900 hover:bg-gray-200 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="relative aspect-[5/4] w-full overflow-hidden rounded-xl shadow-md">
            <Image
              src="/BRANDING.png"
              alt="Printing press branding showcase"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="text-3xl md:text-4xl font-extrabold text-gray-900">10k+</p>
            <p className="mt-1 text-sm text-gray-600">Orders Delivered</p>
          </div>
          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="text-3xl md:text-4xl font-extrabold text-gray-900">98%</p>
            <p className="mt-1 text-sm text-gray-600">On‑time Production</p>
          </div>
          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="text-3xl md:text-4xl font-extrabold text-gray-900">4.9/5</p>
            <p className="mt-1 text-sm text-gray-600">Customer Rating</p>
          </div>
          <div className="rounded-xl bg-white p-6 text-center shadow-sm">
            <p className="text-3xl md:text-4xl font-extrabold text-gray-900">24h</p>
            <p className="mt-1 text-sm text-gray-600">Express Options</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 pb-4 md:pb-10">
        <div className="rounded-2xl bg-white p-6 md:p-10 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What we stand for</h2>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Our promise is simple: dependable quality, transparent pricing, and helpful people at every step.
          </p>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-900">
                <AwardIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Premium quality, every time</h3>
                <p className="mt-1 text-gray-600">
                  Color‑accurate, durable, and consistent results across small and large runs.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-900">
                <ShieldCheckIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Reliable and transparent</h3>
                <p className="mt-1 text-gray-600">
                  Clear timelines, fair pricing, and updates you can count on.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-900">
                <LeafIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Thoughtful materials</h3>
                <p className="mt-1 text-gray-600">
                  A growing selection of eco‑friendly stocks and inks without compromise.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-900">
                <ClockIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Fast, flexible turnaround</h3>
                <p className="mt-1 text-gray-600">
                  From same‑day to scheduled deliveries, we adjust to your deadlines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container mx-auto px-4 pb-10 md:pb-16">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              title: 'Consultation',
              desc: 'Tell us about your goals, specs, and timeline. We help you choose the right format.'
            },
            {
              step: '02',
              title: 'Proof & Review',
              desc: 'We prepare print‑ready files and share digital or physical proofs for sign‑off.'
            },
            {
              step: '03',
              title: 'Production & Delivery',
              desc: 'We print, finish, and ship with care—on time and to your exact specifications.'
            }
          ].map((item) => (
            <div key={item.step} className="rounded-2xl bg-white p-6 shadow-sm">
              <span className="text-sm font-semibold text-primary">{item.step}</span>
              <h3 className="mt-2 text-lg font-bold text-gray-900">{item.title}</h3>
              <p className="mt-1 text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-12 md:py-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Ready to start your next project?</h2>
          <p className="mt-2 text-gray-600">Browse products or reach out for a custom quote.</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-white hover:bg-primary/90 transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-gray-100 px-5 py-2.5 text-gray-900 hover:bg-gray-200 transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
