import React from "react";
import CartList from "./CartList";
import OrderSummary from "@/components/OrderSummary";
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
          </div>
        </div>
      </div>
    </div>
  );
}
