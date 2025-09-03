"use client";

import React, { useState } from 'react';
import { XIcon, UploadIcon } from 'lucide-react';

interface UploadPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadPrintModal({ isOpen, onClose }: UploadPrintModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const res = await fetch('/api/submissions', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to submit');
      }

      setSuccess(true);
      form.reset();
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 900);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      {/* Backdrop */}
      <button
        aria-label="Close upload modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg mx-4 rounded-xl bg-white shadow-xl">
        <div className="flex items-start justify-between p-5 border-b border-gray-200">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Upload your print</h3>
            <p className="text-sm text-gray-600 mt-1">Attach your design and details, we&apos;ll get back to you.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded hover:bg-gray-100" aria-label="Close">
            <XIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-left">
          {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded">{error}</div>}
          {success && <div className="text-sm text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded">Submitted successfully!</div>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full name</label>
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="+1 234 567 890"
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="design" className="block text-sm font-medium text-gray-700">Design file</label>
            <input
              id="design"
              name="design"
              type="file"
              required
              accept="image/*,application/pdf"
              className="mt-1 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
            <p className="text-xs text-gray-500 mt-1">Accepted: Images or PDF. Max ~10MB.</p>
          </div>

          <div>
            <label htmlFor="note" className="block text-sm font-medium text-gray-700">Note (optional)</label>
            <textarea
              id="note"
              name="note"
              rows={4}
              placeholder="Any specific instructions or sizes..."
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200">Cancel</button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-white hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              <UploadIcon className="w-4 h-4" />
              {isSubmitting ? 'Submitting...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
