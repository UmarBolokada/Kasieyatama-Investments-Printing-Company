import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  PhoneIcon,
  MapPinIcon,
  FacebookIcon,
  Mail
} from "lucide-react";
import ScrollToTop from "./ScrollToTop";
import { getCategoriesLimit } from "@/sanity/lib/data";
import { Category } from "@/lib/type";

async function Footer() {
  const categories = await getCategoriesLimit(5);
  
  return (
    <footer className="bg-gray-900 text-white text-sm">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.4fr] gap-4">
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
              <Link
                href="https://www.facebook.com/share/19mPtmBwiZ/?mibextid=wwXIfr"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
              </Link>
              <Link
                href="https://vm.tiktok.com/ZNd5nfajA/"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <Image src="/tiktok.png" alt="TikTok" width={20} height={20} className="w-5 h-5" />
              </Link>
              <Link
                href="mailto:kasieyatamainvestments@gmail.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="E-mail"
              >
                <Mail className="w-5 h-5" />
              </Link>
              {/* <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a> */}
              {/* <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a> */}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              {categories.map((category: Category) => (
                <li key={category._id}>
                  <Link
                    href={`/category/${category.slug.current}`}
                    className="text-gray-300 hover:text-white transition-colors capitalize"
                  >
                    {category.title.toLowerCase()}
                  </Link>
                </li>
              ))}
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
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPinIcon className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    22 Howe Street,
                    <br />
                    Western Freetown.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <PhoneIcon className="w-5 h-5 text-white flex-shrink-0" />
                <a
                  href="tel:+23272665000"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  +232 (72) 665 - 000
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-whiteflex-shrink-0" />
                <a
                  href="mailto:kasieyatamainvestments@gmail.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  kasieyatamainvestments@gmail.com
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
              
            </div>
            <ScrollToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
