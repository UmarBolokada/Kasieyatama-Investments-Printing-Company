import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  PhoneIcon,
  MapPinIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
  Mail,
} from "lucide-react";
import ScrollToTop from "./ScrollToTop";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/kas logo2.png"
                alt="Printing Press Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-xl font-bold">Kasieyatama</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Professional printing services and products. Quality solutions for
              your business needs with fast turnaround and exceptional customer
              service.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services/business-cards"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Business Cards
                </Link>
              </li>
              <li>
                <Link
                  href="/services/flyers"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Flyers & Brochures
                </Link>
              </li>
              <li>
                <Link
                  href="/services/banners"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Banners & Posters
                </Link>
              </li>
              <li>
                <Link
                  href="/services/stickers"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Stickers & Labels
                </Link>
              </li>
              <li>
                <Link
                  href="/services/books"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Books & Magazines
                </Link>
              </li>
              <li>
                <Link
                  href="/services/packaging"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Packaging
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Shop Products
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPinIcon className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    123 Print Street
                    <br />
                    Design District
                    <br />
                    City, State 12345
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+1234567890"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  (123) 456-7890
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@printingpress.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  info@printingpress.com
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-6">
              <h4 className="font-medium mb-2">Business Hours</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              <p>
                &copy; {new Date().getFullYear()} Printing Press. All rights
                reserved.
              </p>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Sitemap
              </Link>
            </div>
            <ScrollToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
