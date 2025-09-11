"use client"

import React, { useState } from "react";
import Link from "next/link";
import { MailIcon, PhoneIcon, MapPinIcon, ClockIcon } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addToast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Store form reference before async operations
    const form = e.currentTarget

    const formData = new FormData(form)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    }

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (response.ok) {
        addToast({
          type: 'success',
          title: 'Message sent successfully!',
          description: 'We\'ll get back to you within one business day.',
          duration: 5000,
        })
        // Reset form using stored reference
        form.reset()
      } else {
        const result = await response.json().catch(() => ({}))
        addToast({
          type: 'error',
          title: 'Failed to send message',
          description: result.error || 'Please try again later.',
          duration: 5000,
        })
      }
    } catch (error) {
      console.error('Contact form error:', error)
      addToast({
        type: 'error',
        title: 'Network error',
        description: 'Please check your connection and try again.',
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        {/* Header */}
        <div className="max-w-2xl">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Contact us
          </h1>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600">
            Have a question or a custom request? We typically respond within one
            business day.
          </p>
        </div>

        {/* Content */}
        <div className="mt-8 sm:mt-10 grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start">
          {/* Contact Details */}
          <div className="space-y-3 sm:space-y-4">
            <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-sm">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-900 flex-shrink-0">
                  <MailIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Email</h3>
                  <p className="mt-1 text-xs sm:text-sm text-gray-600">
                    We&apos;ll get back to you as soon as possible.
                  </p>
                  <a
                    href="mailto:kasieyatamainvestments@gmail.com"
                    className="mt-2 inline-block text-primary hover:underline text-xs sm:text-sm break-all"
                  >
                    kasieyatamainvestments@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-sm">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-900 flex-shrink-0">
                  <PhoneIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Phone</h3>
                  <p className="mt-1 text-xs sm:text-sm text-gray-600">Mon - Fri, 9:00 - 17:00.</p>
                  <a
                    href="tel:+1234567890"
                    className="mt-2 inline-block text-primary hover:underline text-xs sm:text-sm"
                  >
                    +232 (72) 665 - 000
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-sm">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-900 flex-shrink-0">
                  <MapPinIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Address</h3>
                  <p className="mt-1 text-xs sm:text-sm text-gray-600">
                    22 Howe Street, Western Freetown
                  </p>
                  <Link
                    href="/about"
                    className="mt-2 inline-block text-primary hover:underline text-xs sm:text-sm"
                  >
                    About our studio
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-sm">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-900 flex-shrink-0">
                  <ClockIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Hours</h3>
                  <p className="mt-1 text-xs sm:text-sm text-gray-600">
                    Mon - Fri: 9:00 - 17:00
                    <br />
                    Sat: 10:00 - 14:00 - Sun: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 md:p-8 shadow-sm">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              Send us a message
            </h2>
            <p className="mt-1 text-sm sm:text-base text-gray-600">
              Fill out the form and we&apos;ll reply shortly.
            </p>

            <form
              className="mt-4 sm:mt-6 grid grid-cols-1 gap-3 sm:gap-4"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+232 76 123 456"
                    pattern="[\+]?[1-9][\d\s\-\(\)]{6,15}"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="How can we help?"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell us a bit about your project..."
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-xs sm:text-sm text-gray-500 order-2 sm:order-1">
                  By submitting, you agree to our terms.
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-4 sm:px-5 py-2.5 text-sm sm:text-base text-white hover:bg-primary/90 transition-colors order-1 sm:order-2 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
