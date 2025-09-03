import { client } from './client';
import type { QueryParams } from 'next-sanity';
import { backendClient } from './backendClient';
import {
  productQuery,
  productsQuery,
  featuredProductsQuery,
  productsByCategoryQuery,
  searchProductsQuery,
  categoriesQuery,
  categoryQuery,
  productTypesQuery,
  customerByClerkIdQuery,
  customerByIdQuery,
  customerOrdersQuery,
  orderByNumberQuery,
  orderByIdQuery,
  customerPrintingServicesQuery,
  printingServiceByNumberQuery,
  allOrdersQuery,
  allPrintingServicesQuery,
  allCustomersQuery,
  orderStatsQuery,
  productStatsQuery,
  submissionByIdQuery,
  cartByClerkIdQuery,
} from './queries';

// Product Functions
export async function getProduct(slug: string) {
  return await client.fetch(productQuery, { slug });
}

export async function getProducts() {
  return await client.fetch(productsQuery);
}

export async function getFeaturedProducts() {
  return await client.fetch(featuredProductsQuery);
}

export async function getProductsByCategory(categorySlug: string) {
  return await client.fetch(productsByCategoryQuery, { categorySlug });
}

export type SearchProduct = {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  mainImage?: unknown;
  category?: { _id: string; title: string; slug: { current: string } };
  productType?: { _id: string; title: string };
  price: number;
  compareAtPrice?: number;
  stockQuantity?: number;
  tags?: string[];
};

export async function searchProducts(query: string) {
  const data = await client.fetch(searchProductsQuery, { query } as unknown as QueryParams);
  return data;
}

// Category Functions
export async function getCategories() {
  return await client.fetch(categoriesQuery);
}

export async function getCategory(slug: string) {
  return await client.fetch(categoryQuery, { slug });
}

// Product Type Functions
export async function getProductTypes() {
  return await client.fetch(productTypesQuery);
}

// Customer Functions
export async function getCustomerByClerkId(clerkId: string) {
  return await client.fetch(customerByClerkIdQuery, { clerkId });
}

export async function getCustomerById(customerId: string) {
  return await client.fetch(customerByIdQuery, { customerId });
}

// Order Functions
export async function getCustomerOrders(clerkId: string) {
  return await client.fetch(customerOrdersQuery, { clerkId });
}

export async function getOrderByNumber(orderNumber: string) {
  return await client.fetch(orderByNumberQuery, { orderNumber });
}

export async function getOrderById(orderId: string) {
  return await client.fetch(orderByIdQuery, { orderId });
}

// Printing Service Functions
export async function getCustomerPrintingServices(clerkId: string) {
  return await client.fetch(customerPrintingServicesQuery, { clerkId });
}

export async function getPrintingServiceByNumber(serviceNumber: string) {
  return await client.fetch(printingServiceByNumberQuery, { serviceNumber });
}

// Admin Functions
export async function getAllOrders() {
  return await client.fetch(allOrdersQuery);
}

export async function getAllPrintingServices() {
  return await client.fetch(allPrintingServicesQuery);
}

export async function getAllCustomers() {
  return await client.fetch(allCustomersQuery);
}

// Analytics Functions
export async function getOrderStats(startOfMonth?: string) {
  return await client.fetch(orderStatsQuery, { startOfMonth });
}

export async function getProductStats() {
  return await client.fetch(productStatsQuery);
}

// Utility Functions
export async function createCustomer(customerData: Record<string, unknown>) {
  return await client.create({
    _type: 'customer',
    ...customerData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

export async function updateCustomer(customerId: string, customerData: Record<string, unknown>) {
  return await client.patch(customerId).set({
    ...customerData,
    updatedAt: new Date().toISOString(),
  }).commit();
}

export async function createOrder(orderData: Record<string, unknown>) {
  return await client.create({
    _type: 'order',
    ...orderData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

export async function updateOrder(orderId: string, orderData: Record<string, unknown>) {
  return await client.patch(orderId).set({
    ...orderData,
    updatedAt: new Date().toISOString(),
  }).commit();
}


// Submission Functions
export async function createSubmission(data: {
  fullName: string;
  email: string;
  phone: string;
  designImage: { asset: { _ref: string } };
  note?: string;
}) {
  return await backendClient.create({
    _type: 'submission',
    ...data,
    createdAt: new Date().toISOString(),
  });
}

export async function getSubmissionById(id: string) {
  return await client.fetch(submissionByIdQuery, { id });
}

// Generate unique order number
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${timestamp.slice(-6)}-${random}`;
}

// Generate unique service number
export function generateServiceNumber(): string {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `SRV-${timestamp.slice(-6)}-${random}`;
} 

// Cart Functions
export async function getCartByClerkId(clerkId: string) {
  return await client.fetch(cartByClerkIdQuery, { clerkId });
}

export async function createOrUpdateCart(params: {
  clerkId: string;
  items: Array<{ productId: string; quantity: number; price?: number }>;
}) {
  const { clerkId, items } = params;

  // Map to Sanity structure
  const sanityItems = items.map((it) => ({
    _key: `${it.productId}-${Math.random().toString(36).slice(2, 10)}`,
    _type: 'object',
    product: {
      _type: 'reference',
      _ref: it.productId,
    },
    quantity: it.quantity,
    price: it.price,
  }));

  const existing = await client.fetch(cartByClerkIdQuery, { clerkId });
  const timestamp = new Date().toISOString();

  if (existing?._id) {
    return await backendClient
      .patch(existing._id)
      .set({
        items: sanityItems,
        updatedAt: timestamp,
      })
      .commit();
  }

  return await backendClient.create({
    _type: 'cart',
    clerkId,
    items: sanityItems,
    createdAt: timestamp,
    updatedAt: timestamp,
  });
}

export async function clearCartForClerkId(clerkId: string) {
  const existing = await client.fetch(cartByClerkIdQuery, { clerkId });
  if (existing?._id) {
    return await backendClient
      .patch(existing._id)
      .set({ items: [], updatedAt: new Date().toISOString() })
      .commit();
  }
  return null;
}

export async function addItemToCart(
  clerkId: string,
  productId: string,
  quantity: number = 1,
  price?: number,
) {
  const existing = await getCartByClerkId(clerkId);
  const items: Array<{ productId: string; quantity: number; price?: number }> = [];

  const map = new Map<string, { productId: string; quantity: number; price?: number }>();
  if (Array.isArray(existing?.items)) {
    for (const it of existing.items as unknown as Array<{ product?: { _id?: string; _ref?: string }; quantity?: number; price?: number }>) {
      const id = it?.product?._id || it?.product?._ref;
      if (!id) continue;
      map.set(id, { productId: id, quantity: it.quantity || 1, price: typeof it.price === 'number' ? it.price : undefined });
    }
  }

  if (map.has(productId)) {
    const prev = map.get(productId)!;
    map.set(productId, { productId, quantity: prev.quantity + quantity, price: price ?? prev.price });
  } else {
    map.set(productId, { productId, quantity, price });
  }

  for (const v of map.values()) items.push(v);

  return await createOrUpdateCart({ clerkId, items });
}

export async function removeItemFromCart(clerkId: string, productId: string) {
  const existing = await getCartByClerkId(clerkId);
  const items: Array<{ productId: string; quantity: number; price?: number }> = [];
  if (Array.isArray(existing?.items)) {
    for (const it of existing.items as unknown as Array<{ product?: { _id?: string; _ref?: string }; quantity?: number; price?: number }>) {
      const id = it?.product?._id || it?.product?._ref;
      if (!id || id === productId) continue;
      items.push({ productId: id, quantity: it.quantity || 1, price: typeof it.price === 'number' ? it.price : undefined });
    }
  }
  return await createOrUpdateCart({ clerkId, items });
}

export async function updateItemQuantityInCart(clerkId: string, productId: string, quantity: number) {
  const existing = await getCartByClerkId(clerkId);
  const items: Array<{ productId: string; quantity: number; price?: number }> = [];
  if (Array.isArray(existing?.items)) {
    for (const it of existing.items as unknown as Array<{ product?: { _id?: string; _ref?: string }; quantity?: number; price?: number }>) {
      const id = it?.product?._id || it?.product?._ref;
      if (!id) continue;
      if (id === productId) {
        if (quantity > 0) {
          items.push({ productId: id, quantity, price: typeof it.price === 'number' ? it.price : undefined });
        }
      } else {
        items.push({ productId: id, quantity: it.quantity || 1, price: typeof it.price === 'number' ? it.price : undefined });
      }
    }
  }
  return await createOrUpdateCart({ clerkId, items });
}