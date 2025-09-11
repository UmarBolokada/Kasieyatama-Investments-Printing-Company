import React from "react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Terms of Use
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Agreement to Terms</h2>
            <p className="text-gray-600 mb-6">
              By accessing and using Kasieyatama Investments&apos; website and services, you agree to be 
              bound by these Terms of Use and all applicable laws and regulations. If you do not 
              agree with any of these terms, you are prohibited from using this site.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Description</h2>
            <p className="text-gray-600 mb-6">
              Kasieyatama Investments provides professional printing services including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Business cards and stationery</li>
              <li>Flyers, brochures, and marketing materials</li>
              <li>Banners, posters, and signage</li>
              <li>Stickers, labels, and decals</li>
              <li>Books, magazines, and publications</li>
              <li>Packaging and promotional materials</li>
              <li>Custom printing solutions</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Process and Payment</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Placement</h3>
            <p className="text-gray-600 mb-4">
              All orders must be placed through our website, phone, or in-person. Orders are subject to 
              acceptance by us and may be rejected for any reason.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Payment Terms</h3>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Payment is required before production begins unless credit terms have been established</li>
              <li>We accept cash, bank transfers, and mobile money payments</li>
              <li>Prices are subject to change without notice</li>
              <li>Additional charges may apply for rush orders or special requirements</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">File Requirements and Specifications</h2>
            <p className="text-gray-600 mb-4">
              Customers are responsible for providing print-ready files that meet our specifications:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Files must be in PDF, AI, PSD, PNG, JPG, or TIFF format</li>
              <li>Minimum resolution of 300 DPI for print quality</li>
              <li>Proper color settings (CMYK recommended)</li>
              <li>Bleed and trim marks included where necessary</li>
              <li>All fonts must be embedded or outlined</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Production and Delivery</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Turnaround Times</h3>
            <p className="text-gray-600 mb-4">
              Standard turnaround time is 3-5 business days. Rush orders may be available for an 
              additional fee. Complex or large quantity orders may require longer production times.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality Control</h3>
            <p className="text-gray-600 mb-6">
              We maintain high quality standards, but customers are responsible for reviewing and 
              approving proofs before final production. We are not liable for errors in customer-provided content.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cancellation and Refunds</h2>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Orders may be cancelled before production begins with full refund</li>
              <li>Once production has started, cancellation may result in partial refund</li>
              <li>Completed orders are generally not eligible for refunds unless there is a quality issue</li>
              <li>Refunds will be processed within 5-10 business days</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Intellectual Property</h2>
            <p className="text-gray-600 mb-6">
              Customers retain ownership of their original content and designs. By placing an order, 
              you grant us a limited license to use your content solely for the purpose of fulfilling 
              your order. We will not use your content for any other purpose without your permission.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Limitation of Liability</h2>
            <p className="text-gray-600 mb-6">
              Kasieyatama Investments&apos; liability is limited to the cost of the specific order. We are 
              not liable for any indirect, incidental, or consequential damages arising from the use 
              of our services or products.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Force Majeure</h2>
            <p className="text-gray-600 mb-6">
              We are not liable for delays or failures in performance due to circumstances beyond our 
              control, including but not limited to natural disasters, government actions, or equipment failures.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Governing Law</h2>
            <p className="text-gray-600 mb-6">
              These terms are governed by the laws of Sierra Leone. Any disputes will be resolved 
              in the courts of Sierra Leone.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to Terms</h2>
            <p className="text-gray-600 mb-6">
              We reserve the right to modify these terms at any time. Changes will be effective 
              immediately upon posting on our website. Continued use of our services constitutes 
              acceptance of the modified terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Use, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 mb-2">
                <strong>Email:</strong> kasieyatamainvestments@gmail.com
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Phone:</strong> +232 (72) 665 - 000
              </p>
              <p className="text-gray-600">
                <strong>Address:</strong> 22 Howe Street, Western Freetown
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
