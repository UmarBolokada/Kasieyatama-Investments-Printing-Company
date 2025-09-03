'use client'
import { ArrowUpIcon } from 'lucide-react'

export default function ScrollToTop() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
  return (
    <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Scroll to top"
            >
              <span className="text-sm">Back to top</span>
              <ArrowUpIcon className="w-4 h-4" />
            </button>
  )
}
