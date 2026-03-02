import React from "react";
import CartList from "./CartList";
import OrderSummary from "@/components/OrderSummary";
import Link from "next/link";
// import OrderSummary from "./OrderSummary";

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 xl:gap-x-12 lg:items-start">
          <div className="lg:col-span-7">
            <CartList />
          </div>

          {/* Order Summary */}
          <div className="mt-8 lg:mt-0 lg:col-span-5">
            <OrderSummary />
            <p className="mt-2 text-sm text-center text-gray-500">Purchases are currently not available, <Link href="/upload" className="underline cursor-pointer font-semibold">Submit a print</Link> instead, we will reach out to you. Thanks!.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
