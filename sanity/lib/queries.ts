import { groq } from 'next-sanity';

// Product Queries
export const productQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    content,
    mainImage,
    images,
    category->{
      _id,
      title,
      slug
    },
    productType->{
      _id,
      title
    },
    price,
    compareAtPrice,
    costPrice,
    sku,
    barcode,
    stockQuantity,
    isActive,
    isFeatured,
    tags,
    specifications,
    dimensions,
    seo
  }
`;

export const productsQuery = groq`
  *[_type == "product" && isActive == true] | order(createdAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage,
    images,
    category->{
      _id,
      title,
      slug
    },
    productType->{
      _id,
      title
    },
    price,
    compareAtPrice,
    stockQuantity,
    isFeatured,
    tags
  }
`;

export const featuredProductsQuery = groq`
  *[_type == "product" && isActive == true && isFeatured == true] | order(createdAt desc)[0...4] {
    _id,
    title,
    slug,
    description,
    mainImage,
    images,
    category->{
      _id,
      title,
      slug
    },
    productType->{
      _id,
      title
    },
    price,
    compareAtPrice,
    stockQuantity,
    tags
  }
`;

export const productsByCategoryQuery = groq`
  *[_type == "product" && isActive == true && category->slug.current == $categorySlug] | order(createdAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage,
    images,
    category->{
      _id,
      title,
      slug
    },
    productType->{
      _id,
      title
    },
    price,
    compareAtPrice,
    stockQuantity,
    tags
  }
`;

export const searchProductsQuery = groq`
  *[_type == "product" && isActive == true && (
    title match $query + "*" ||
    description match $query + "*" ||
    tags[] match $query + "*"
  )] | order(createdAt desc) {
    _id,
    title,
    slug,
    description,
    mainImage,
    images,
    category->{
      _id,
      title,
      slug
    },
    productType->{
      _id,
      title
    },
    price,
    compareAtPrice,
    stockQuantity,
    tags
  }
`;

// Category Queries
export const categoriesQuery = groq`
  *[_type == "category" && isActive == true] | order(sortOrder asc, title asc) {
    _id,
    title,
    slug,
    description,
    image
  }
`;

export const categoryQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    image
  }
`;

// Product Type Queries
export const productTypesQuery = groq`
  *[_type == "productType"] | order(title asc) {
    _id,
    title
  }
`;

// Customer Queries
export const customerByClerkIdQuery = groq`
  *[_type == "customer" && clerkId == $clerkId][0] {
    _id,
    clerkId,
    name,
    email,
    phone,
    image,
    dateOfBirth,
    gender,
    addresses,
    preferences,
    isActive,
    totalOrders,
    totalSpent,
    lastOrderDate,
    createdAt,
    updatedAt
  }
`;

export const customerByIdQuery = groq`
  *[_type == "customer" && _id == $customerId][0] {
    _id,
    clerkId,
    name,
    email,
    phone,
    image,
    dateOfBirth,
    gender,
    addresses,
    preferences,
    isActive,
    totalOrders,
    totalSpent,
    lastOrderDate,
    createdAt,
    updatedAt
  }
`;

// Order Queries
export const customerOrdersQuery = groq`
  *[_type == "order" && customer->clerkId == $clerkId] | order(createdAt desc) {
    _id,
    orderNumber,
    customer->{
      _id,
      name,
      email
    },
    items[]{
      product->{
        _id,
        title,
        mainImage
      },
      quantity,
      price,
      total
    },
    subtotal,
    tax,
    shipping,
    discount,
    total,
    status,
    paymentStatus,
    paymentMethod,
    createdAt,
    updatedAt
  }
`;

export const orderByNumberQuery = groq`
  *[_type == "order" && orderNumber == $orderNumber][0] {
    _id,
    orderNumber,
    customer->{
      _id,
      name,
      email,
      phone
    },
    items[]{
      product->{
        _id,
        title,
        mainImage,
        sku
      },
      quantity,
      price,
      total
    },
    subtotal,
    tax,
    shipping,
    discount,
    total,
    status,
    paymentStatus,
    paymentMethod,
    shippingAddress,
    billingAddress,
    notes,
    trackingNumber,
    shippedAt,
    deliveredAt,
    createdAt,
    updatedAt
  }
`;

export const orderByIdQuery = groq`
  *[_type == "order" && _id == $orderId][0] {
    _id,
    orderNumber,
    customer->{
      _id,
      name,
      email,
      phone
    },
    items[]{
      product->{
        _id,
        title,
        mainImage,
        sku
      },
      quantity,
      price,
      total
    },
    subtotal,
    tax,
    shipping,
    discount,
    total,
    status,
    paymentStatus,
    paymentMethod,
    shippingAddress,
    billingAddress,
    notes,
    trackingNumber,
    shippedAt,
    deliveredAt,
    createdAt,
    updatedAt
  }
`;

// Printing Service Queries
export const customerPrintingServicesQuery = groq`
  *[_type == "printingService" && customer->clerkId == $clerkId] | order(createdAt desc) {
    _id,
    serviceNumber,
    customer->{
      _id,
      name,
      email
    },
    serviceType,
    title,
    description,
    specifications,
    status,
    quote,
    payment,
    createdAt,
    updatedAt
  }
`;

export const printingServiceByNumberQuery = groq`
  *[_type == "printingService" && serviceNumber == $serviceNumber][0] {
    _id,
    serviceNumber,
    customer->{
      _id,
      name,
      email,
      phone
    },
    serviceType,
    title,
    description,
    specifications,
    files,
    status,
    quote,
    payment,
    notes,
    customerNotes,
    createdAt,
    updatedAt
  }
`;

// Admin Queries
export const allOrdersQuery = groq`
  *[_type == "order"] | order(createdAt desc) {
    _id,
    orderNumber,
    customer->{
      _id,
      name,
      email
    },
    total,
    status,
    paymentStatus,
    createdAt
  }
`;

export const allPrintingServicesQuery = groq`
  *[_type == "printingService"] | order(createdAt desc) {
    _id,
    serviceNumber,
    customer->{
      _id,
      name,
      email
    },
    serviceType,
    title,
    status,
    quote,
    payment,
    createdAt
  }
`;

export const allCustomersQuery = groq`
  *[_type == "customer"] | order(createdAt desc) {
    _id,
    name,
    email,
    phone,
    totalOrders,
    totalSpent,
    lastOrderDate,
    isActive,
    createdAt
  }
`;

// Analytics Queries
export const orderStatsQuery = groq`
  {
    "totalOrders": count(*[_type == "order"]),
    "pendingOrders": count(*[_type == "order" && status == "pending"]),
    "completedOrders": count(*[_type == "order" && status == "delivered"]),
    "totalRevenue": sum(*[_type == "order" && paymentStatus == "paid"].total),
    "monthlyRevenue": sum(*[_type == "order" && paymentStatus == "paid" && createdAt >= $startOfMonth].total)
  }
`;

export const productStatsQuery = groq`
  {
    "totalProducts": count(*[_type == "product"]),
    "activeProducts": count(*[_type == "product" && isActive == true]),
    "featuredProducts": count(*[_type == "product" && isFeatured == true]),
    "lowStockProducts": count(*[_type == "product" && stockQuantity <= 10])
  }
`;

// Submission Queries
export const submissionByIdQuery = groq`
  *[_type == "submission" && _id == $id][0] {
    _id,
    _createdAt,
    fullName,
    email,
    phone,
    designImage,
    note
  }
`;

// Message Queries
export const messagesQuery = groq`
  *[_type == "message"] | order(_createdAt desc) {
    _id,
    _createdAt,
    name,
    email,
    phone,
    subject,
    message,
    status,
    priority,
    source,
    notes,
    createdAt
  }
`;

export const messageByIdQuery = groq`
  *[_type == "message" && _id == $id][0] {
    _id,
    _createdAt,
    name,
    email,
    phone,
    subject,
    message,
    status,
    priority,
    source,
    notes,
    createdAt
  }
`;

export const messagesByStatusQuery = groq`
  *[_type == "message" && status == $status] | order(_createdAt desc) {
    _id,
    _createdAt,
    name,
    email,
    phone,
    subject,
    message,
    status,
    priority,
    source,
    notes,
    createdAt
  }
`;

export const messageStatsQuery = groq`
  {
    "totalMessages": count(*[_type == "message"]),
    "newMessages": count(*[_type == "message" && status == "new"]),
    "readMessages": count(*[_type == "message" && status == "read"]),
    "repliedMessages": count(*[_type == "message" && status == "replied"]),
    "closedMessages": count(*[_type == "message" && status == "closed"])
  }
`;

// Cart Queries
export const cartByClerkIdQuery = groq`
  *[_type == "cart" && clerkId == $clerkId][0] {
    _id,
    clerkId,
    items[]{
      product->{
        _id,
        title,
        slug,
        mainImage,
        price,
        stockQuantity
      },
      quantity,
      price
    },
    createdAt,
    updatedAt
  }
`;
