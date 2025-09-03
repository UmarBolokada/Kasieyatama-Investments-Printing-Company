"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser, SignInButton } from '@clerk/nextjs';
import { getCustomerOrders } from '@/sanity/lib/data';
import { urlFor } from '@/sanity/lib/image';

type OrderItem = {
  product?: {
    _id: string;
    title: string;
    mainImage?: {
      asset: {
        _ref: string;
      };
    };
  };
  quantity: number;
  price?: number;
  total?: number;
};

type CustomerOrder = {
  _id: string;
  orderNumber?: string;
  items?: OrderItem[];
  subtotal?: number;
  tax?: number;
  shipping?: number;
  discount?: number;
  total?: number;
  totalPrice?: number;
  status?: string;
  paymentStatus?: string;
  createdAt?: string;
};

export default function OrdersPage() {
  const { isSignedIn, user } = useUser();
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!isSignedIn || !user?.id) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await getCustomerOrders(user.id);
        setOrders(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setError('Failed to load your orders.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [isSignedIn, user?.id]);

  if (!isSignedIn) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-semibold mb-4">Your Orders</h1>
        <p className="text-gray-600 mb-6">Please sign in to view your order history.</p>
        <SignInButton mode="modal">
          <button className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90">Sign in</button>
        </SignInButton>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Your Orders</h1>

      {loading ? (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse bg-white rounded-lg shadow p-4 h-28" />
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded p-4">{error}</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 mb-4">You have no orders yet.</p>
          <Link href="/products" className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90">Start shopping</Link>
        </div>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => {
            const orderTotal = order.total ?? order.totalPrice ?? 0;
            const created = order.createdAt ? new Date(order.createdAt) : null;
            const items = order.items || [];
            const itemCount = items.reduce((sum, it) => sum + (it.quantity || 0), 0);
            return (
              <div key={order._id} className="bg-white rounded-lg shadow p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-sm text-gray-500">Order</p>
                    <p className="font-semibold">{order.orderNumber || order._id}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Placed</p>
                      <p className="font-medium">{created ? created.toLocaleDateString() : '-'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-semibold">${orderTotal.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-medium capitalize">{order.status || 'pending'}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {items.slice(0, 6).map((it, idx) => (
                    <div key={`${order._id}-${idx}`} className="flex items-center gap-3">
                      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded border border-gray-200 bg-gray-50">
                        {it.product?.mainImage ? (
                          <Image src={urlFor(it.product.mainImage).url()} alt={it.product?.title || 'Item'} fill className="object-cover" />
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{it.product?.title || 'Item'}</p>
                        <p className="text-xs text-gray-500">Qty {it.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 text-sm text-gray-600">{itemCount} {itemCount === 1 ? 'item' : 'items'}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}


