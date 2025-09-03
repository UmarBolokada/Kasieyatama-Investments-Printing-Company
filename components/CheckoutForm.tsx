"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/contexts/CartContext';
import { useUser, SignInButton } from '@clerk/nextjs';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import OrderSummary from './OrderSummary';
import Script from 'next/script';

type CheckoutFormValues = {
  firstName: string;
  lastName: string;
  email?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode?: string;
  country: string;
  phone?: string;
  note?: string;
};

const schema: yup.ObjectSchema<CheckoutFormValues> = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Must be a valid email'),
  address1: yup.string().required('Address line 1 is required'),
  address2: yup.string().optional(),
  city: yup.string().required('City is required'),
  state: yup.string().required('State/Province is required'),
  postalCode: yup.string().optional(),
  country: yup.string().required('Country is required'),
  phone: yup.string().required("Phone number is required"),
  note: yup.string().optional(),
});

export default function CheckoutForm() {
  const { state } = useCart();
  const { isSignedIn } = useUser();
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
      phone: '',
      note: '',
    },
  });

  const totals = useMemo(() => {
    const subtotal = state.total;
    const shippingCost = state.itemCount > 0 ? 0 : 0; // Placeholder
    const tax = 0; // Placeholder
    const total = subtotal + shippingCost + tax;
    return { subtotal, shippingCost, tax, total };
  }, [state.total, state.itemCount]);

  type FlutterwaveResponse = { transaction_id?: string };
  const onSubmit = async (values: CheckoutFormValues) => {
    if (!isSignedIn || state.items.length === 0) return;
    console.log('Checkout form submission', { values, items: state.items, totals });

    window.FlutterwaveCheckout({
        public_key: process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY,
        tx_ref: Date.now().toString(),
        amount: totals.total,
        currency: "USD",
        payment_options: "card,mobilemoney",
        customer: {
          email: values.email,
          phonenumber: values.phone,
          name: values.lastName + values.firstName,
        },
        customizations: {
          title: "My Printing Press",
          description: "Payment for cart items",
          logo: "/kas logo.jpg",
        },
        callback: async function (response: FlutterwaveResponse) {
          // Send transaction ID to your backend for verification
        const res =  await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              transaction_id: response.transaction_id,
            }),
          });

          console.log('response from payment endpoint:::::', res)
        },
        onclose: function () {
          console.log("Payment modal closed");
        },
      });
  };

  if (state.items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-600 mb-4">Your cart is empty.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/products" className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90">Browse products</Link>
          <Link href="/cart" className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100">Go to cart</Link>
        </div>
      </div>
    );
  }

//   const email = watch('email') || '';
//   const phone = watch('phone') || '';
//   const name = `${watch('firstName') || ''} ${watch('lastName') || ''}`.trim();

  return (
    <>
    <Script
        src="https://checkout.flutterwave.com/v3.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 space-y-6">
        <section className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-4">Shipping address</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">First name</label>
              <input className="w-full px-3 py-2 rounded border border-gray-300" {...register('firstName')} />
              {errors.firstName && <p className="text-xs text-red-600 mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Last name</label>
              <input className="w-full px-3 py-2 rounded border border-gray-300" {...register('lastName')} />
              {errors.lastName && <p className="text-xs text-red-600 mt-1">{errors.lastName.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-700 mb-1">Email (optional)</label>
              <input className="w-full px-3 py-2 rounded border border-gray-300" {...register('email')} />
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-700 mb-1">Address line 1</label>
              <input className="w-full px-3 py-2 rounded border border-gray-300" {...register('address1')} />
              {errors.address1 && <p className="text-xs text-red-600 mt-1">{errors.address1.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-700 mb-1">Address line 2 (optional)</label>
              <input className="w-full px-3 py-2 rounded border border-gray-300" {...register('address2')} />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">City</label>
              <input className="w-full px-3 py-2 rounded border border-gray-300" {...register('city')} />
              {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">State/Province</label>
              <input className="w-full px-3 py-2 rounded border border-gray-300" {...register('state')} />
              {errors.state && <p className="text-xs text-red-600 mt-1">{errors.state.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Postal code</label>
              <input className="w-full px-3 py-2 rounded border border-gray-300" {...register('postalCode')} />
              {errors.postalCode && <p className="text-xs text-red-600 mt-1">{errors.postalCode.message}</p>}
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Country</label>
              <input className="w-full px-3 py-2 rounded border border-gray-300" {...register('country')} />
              {errors.country && <p className="text-xs text-red-600 mt-1">{errors.country.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-700 mb-1">Phone (optional)</label>
              <input className="w-full px-3 py-2 rounded border border-gray-300" {...register('phone')} />
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-4">Order note (optional)</h2>
          <textarea className="w-full px-3 py-2 rounded border border-gray-300 min-h-24" {...register('note')} />
        </section>

        {!isSignedIn ? (
          <div className="flex items-center gap-3">
            <SignInButton mode="modal">
              <button type="button" className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90">Sign in to continue</button>
            </SignInButton>
            <Link href="/cart" className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100">Back to cart</Link>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {/* <button type="submit" disabled={!isValid || isSubmitting || state.items.length === 0} className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? 'Processing...' : 'Save details'}
            </button> */}
            {/* <CheckoutButton isDisabled={!scriptLoaded} amount={totals.total} cartItems={state.items} customer={{ email, phone, name }} /> */}
            <button
        disabled={!scriptLoaded || isSubmitting}
        type="submit"
        className="px-4 py-2 bg-black text-white rounded-lg disabled:bg-gray-400"
      >
        {scriptLoaded || !isSubmitting ? "Pay Now" : "Loading..."}
      </button>
            <Link href="/cart" className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100">Back to cart</Link>
          </div>
        )}
      </form>

      <OrderSummary />
    </div>
    </>
  );
}


