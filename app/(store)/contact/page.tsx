import React from "react";
import Link from "next/link";
import { MailIcon, PhoneIcon, MapPinIcon, ClockIcon } from "lucide-react";

export default async function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="container mx-auto px-4 py-12 md:py-16">
        {/* Header */}
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Contact us
          </h1>
          <p className="mt-3 text-gray-600">
            Have a question or a custom request? We typically respond within one
            business day.
          </p>
        </div>

        {/* Content */}
        <div className="mt-10 grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* Contact Details */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-900">
                  <MailIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="mt-1 text-gray-600">
                    We&apos;ll get back to you as soon as possible.
                  </p>
                  <a
                    href="mailto:kasieyatamainvestments@gmail.com"
                    className="mt-2 inline-block text-primary hover:underline"
                  >
                    kasieyatamainvestments@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-900">
                  <PhoneIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone</h3>
                  <p className="mt-1 text-gray-600">Mon - Fri, 9:00 - 17:00.</p>
                  <a
                    href="tel:+1234567890"
                    className="mt-2 inline-block text-primary hover:underline"
                  >
                    +1 (234) 567 - 890
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-900">
                  <MapPinIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Address</h3>
                  <p className="mt-1 text-gray-600">
                    22 Howe Street, Western Freetown
                  </p>
                  <Link
                    href="/about"
                    className="mt-2 inline-block text-primary hover:underline"
                  >
                    About our studio
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-gray-900">
                  <ClockIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Hours</h3>
                  <p className="mt-1 text-gray-600">
                    Mon - Fri: 9:00 - 17:00
                    <br />
                    Sat: 10:00 - 14:00 - Sun: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Send us a message
            </h2>
            <p className="mt-1 text-gray-600">
              Fill out the form and we&apos;ll reply shortly.
            </p>

            <form
              className="mt-6 grid grid-cols-1 gap-4"
              method="post"
              action="mailto:hello@example.com"
              noValidate
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="jane@example.com"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="How can we help?"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="Tell us a bit about your project..."
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-gray-500">
                  By submitting, you agree to our terms.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-white hover:bg-primary/90 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
