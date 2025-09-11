import React from "react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Privacy Policy
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
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Introduction</h2>
            <p className="text-gray-600 mb-6">
              Kasieyatama Investments (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website or use our printing services.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Information We Collect</h2>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h3>
            <p className="text-gray-600 mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Register for an account</li>
              <li>Place an order for printing services</li>
              <li>Contact us through our website or phone</li>
              <li>Subscribe to our newsletter</li>
              <li>Participate in surveys or promotions</li>
            </ul>

            <p className="text-gray-600 mb-6">
              This information may include your name, email address, phone number, mailing address, 
              payment information, and any other information you choose to provide.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage Information</h3>
            <p className="text-gray-600 mb-6">
              We automatically collect certain information about your device and how you interact with 
              our website, including your IP address, browser type, operating system, pages visited, 
              time spent on pages, and referring website.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Provide customer support</li>
              <li>Send you order confirmations and updates</li>
              <li>Improve our website and services</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Information Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>To trusted service providers who assist us in operating our website and conducting our business</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer or acquisition</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Security</h2>
            <p className="text-gray-600 mb-6">
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of 
              transmission over the internet or electronic storage is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Rights</h2>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookies</h2>
            <p className="text-gray-600 mb-6">
              We use cookies and similar technologies to enhance your experience on our website. 
              You can control cookie settings through your browser preferences.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to This Policy</h2>
            <p className="text-gray-600 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy, please contact us:
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
