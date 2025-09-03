"use client"
import React, { useState } from 'react'
import UploadPrintModal from './UploadPrintModal'
import { ArrowRightIcon } from 'lucide-react';

export default function SubmitQuoteButton() {
    const [isUploadOpen, setIsUploadOpen] = useState(false);
  return (
    <>
        <button
        onClick={() => setIsUploadOpen(true)}
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Upload Print
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </button>
        <UploadPrintModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </>
  )
}
