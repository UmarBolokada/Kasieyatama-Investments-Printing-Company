"use client";
import React from "react";
import { ChevronDownIcon } from "lucide-react";

export default function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = React.useState(false);
  
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <button
          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-lg font-medium text-gray-900">{question}</span>
          <ChevronDownIcon
            className={`w-5 h-5 text-gray-500 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isOpen && (
          <div className="px-6 pb-4">
            <p className="text-gray-600 leading-relaxed">{answer}</p>
          </div>
        )}
      </div>
    );
  };