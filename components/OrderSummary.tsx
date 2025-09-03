"use client"
import { useCart } from '@/lib/contexts/CartContext';
import Image from 'next/image';
import React, { useMemo } from 'react';

export default function OrderSummary() {
    const { state } = useCart();

    const totals = useMemo(() => {
        const subtotal = state.total;
        const shippingCost = state.itemCount > 0 ? 0 : 0; // Placeholder
        const tax = 0; // Placeholder
        const total = subtotal + shippingCost + tax;
        return { subtotal, shippingCost, tax, total };
      }, [state.total, state.itemCount]);
      
  return (
    <aside className="lg:col-span-5">
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-4">Order summary</h2>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
            {state.items.map((item) => (
              <div key={item._id} className="flex items-center gap-3">
                <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded border border-gray-200">
                  {item.mainImage ? (
                    <Image src={item.mainImage} alt={item.title} fill className="object-cover" />
                  ) : (
                    <div className="h-full w-full bg-gray-100" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
                  <p className="text-xs text-gray-500">Qty {item.quantity}</p>
                </div>
                <div className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-gray-200 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${totals.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{totals.shippingCost === 0 ? 'Free' : `$${totals.shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>${totals.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-900 font-semibold text-base">
              <span>Total</span>
              <span>${totals.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </aside>
  )
}
