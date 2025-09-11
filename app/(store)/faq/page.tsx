import React from "react";
import FAQItem from "./FAQItem";

const faqs = [
  {
    question: "What printing services do you offer?",
    answer: "We offer a comprehensive range of printing services including business cards, flyers, brochures, banners, posters, stickers, labels, books, magazines, packaging materials, and custom printing solutions for all your business needs."
  },
  {
    question: "How long does it take to complete an order?",
    answer: "Our standard turnaround time is 3-5 business days for most orders. Rush orders can be completed in 1-2 business days for an additional fee. Complex or large quantity orders may take longer, and we'll provide you with an accurate timeline when you place your order."
  },
  {
    question: "What file formats do you accept?",
    answer: "We accept most common file formats including PDF, AI, PSD, PNG, JPG, and TIFF. For best results, we recommend PDF files with high resolution (300 DPI) and proper color settings. Our team can help you prepare your files if needed."
  },
  {
    question: "Do you offer design services?",
    answer: "Yes! Our experienced design team can help create custom designs for your printing projects. We offer logo design, business card design, flyer design, and complete branding packages. Design services are charged separately from printing costs."
  },
  {
    question: "What are your payment options?",
    answer: "We accept cash, bank transfers, and mobile money payments. Payment is typically required before we begin production, though we may offer credit terms for established business customers. Contact us to discuss payment arrangements."
  },
  {
    question: "Can I get a quote before placing an order?",
    answer: "Absolutely! We provide free, no-obligation quotes for all our services. Simply contact us with your project details including quantity, specifications, and any special requirements, and we'll provide you with a detailed quote within 24 hours."
  },
  {
    question: "What if I'm not satisfied with my order?",
    answer: "We stand behind the quality of our work. If you're not completely satisfied with your order, please contact us within 7 days of delivery. We'll work with you to resolve any issues, including reprinting if necessary, at no additional cost."
  },
  {
    question: "Do you offer bulk discounts?",
    answer: "Yes, we offer competitive pricing for bulk orders. Discounts typically start at quantities of 100+ pieces and increase with larger orders. Contact us with your quantity requirements for a custom quote with bulk pricing."
  },
  {
    question: "Can you print on different materials?",
    answer: "We work with a wide variety of materials including various paper weights, cardstock, vinyl, fabric, metal, and specialty materials. Let us know your specific requirements, and we'll recommend the best material for your project."
  },
  {
    question: "How do I track my order?",
    answer: "Once your order is placed, we'll provide you with an order number and estimated completion date. You can contact us anytime for updates on your order status. We'll also notify you when your order is ready for pickup or delivery."
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Find answers to common questions about our printing services
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 mb-6">
            Can&apos;t find the answer you&apos;re looking for? Our team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="tel:+23272665000"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Call +232 (72) 665 - 000
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}