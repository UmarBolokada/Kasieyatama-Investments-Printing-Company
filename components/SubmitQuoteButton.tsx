"use client"
import React, { useState } from 'react'
import UploadPrintModal from './UploadPrintModal'
import { ArrowRightIcon } from 'lucide-react';

interface Props {
  theme: 'light' | 'dark',
  w?: string
}
export default function SubmitQuoteButton({theme = 'light', w}:Props) {
    const [isUploadOpen, setIsUploadOpen] = useState(false);
  return (
    <>
        <button
        onClick={() => setIsUploadOpen(true)}
                className={`inline-flex items-center px-3 sm:px-8 py-4 border-2 ${theme == 'light' ? 'border-white text-white hover:bg-gray-300 hover:text-gray-300':'border-gray-800 text-gray-800 hover:bg-gray-700 hover:text-gray-700'} font-semibold rounded-lg  transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 sm:w-auto ${w ?? 'w-fit'}`}
              >
                Upload Print
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </button>
        <UploadPrintModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </>
  )
}
