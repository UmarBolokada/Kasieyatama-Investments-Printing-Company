// Category Types
export interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  image?: {
    asset: {
      _ref: string;
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
    crop?: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
  };
  parent?: {
    _ref: string;
  };
  isActive: boolean;
  sortOrder: number;
}

// Product Types
export interface Product {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  content?: unknown[]; // Portable Text content
  mainImage: {
    asset: {
      _ref: string;
    };
  };
  images?: Array<{
    asset: {
      _ref: string;
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
    crop?: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
  }>;
  category: {
    _ref: string;
    slug: {
      current: string;
    };
  };
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  sku?: string;
  barcode?: string;
  stockQuantity: number;
  isActive: boolean;
  isFeatured: boolean;
  tags?: string[];
  specifications?: Array<{
    name: string;
    value: string;
  }>;
  dimensions?: {
    width?: number;
    height?: number;
    depth?: number;
    weight?: number;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
  };
}

// Customer Types
export interface Customer {
  _id: string;
  clerkId: string;
  name: string;
  email: string;
  phone?: string;
  image?: {
    asset: {
      _ref: string;
    };
  };
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  addresses?: Array<{
    type: 'home' | 'work' | 'other';
    isDefault: boolean;
    firstName?: string;
    lastName?: string;
    company?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    phone?: string;
  }>;
  preferences?: {
    newsletter: boolean;
    marketing: boolean;
    currency: 'SLL' | 'USD' | 'EUR' | 'GBP' | 'CAD';
    language: 'en' | 'es' | 'fr' | 'de';
  };
  isActive: boolean;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Order Types
export interface Order {
  _id: string;
  orderNumber: string;
  customer: {
    _ref: string;
  };
  items: Array<{
    product: {
      _ref: string;
    };
    quantity: number;
    price: number;
    total: number;
  }>;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod?: 'credit_card' | 'paypal' | 'bank_transfer' | 'cod';
  shippingAddress?: {
    firstName?: string;
    lastName?: string;
    company?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    phone?: string;
  };
  billingAddress?: {
    firstName?: string;
    lastName?: string;
    company?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    phone?: string;
  };
  notes?: string;
  trackingNumber?: string;
  shippedAt?: string;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Printing Service Types
export interface PrintingService {
  _id: string;
  serviceNumber: string;
  customer: {
    _ref: string;
  };
  serviceType: 'business_cards' | 'flyers_brochures' | 'banners_posters' | 'stickers_labels' | 'books_magazines' | 'packaging' | 'custom_design' | 'other';
  title: string;
  description: string;
  specifications?: {
    quantity: number;
    size?: string;
    paperType?: 'glossy' | 'matte' | 'uncoated' | 'recycled' | 'premium' | 'other';
    colorType?: 'full_color' | 'black_white' | 'spot_color' | 'grayscale';
    finishing?: string[];
    deadline?: string;
    rushOrder: boolean;
  };
  files?: Array<{
    file?: {
      asset: {
        _ref: string;
      };
    };
    description?: string;
    uploadedAt?: string;
  }>;
  status: 'submitted' | 'reviewing' | 'quoted' | 'approved' | 'production' | 'quality_check' | 'ready' | 'completed' | 'cancelled';
  quote?: {
    amount?: number;
    currency: 'SLL' | 'USD' | 'EUR' | 'GBP' | 'CAD';
    validUntil?: string;
    notes?: string;
  };
  payment?: {
    status: 'pending' | 'paid' | 'partial' | 'refunded';
    amount: number;
    method?: 'credit_card' | 'paypal' | 'bank_transfer' | 'cash';
    paidAt?: string;
  };
  notes?: string;
  customerNotes?: string;
  createdAt: string;
  updatedAt: string;
}

// Utility Types
export type CategoryWithParent = Category & {
  parent?: Category;
};

export type ProductWithCategory = Product & {
  category: Category;
};

export type OrderWithCustomer = Order & {
  customer: Customer;
};

export type PrintingServiceWithCustomer = PrintingService & {
  customer: Customer;
};

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Product Card Type (for display components)
export interface ProductCardType {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  mainImage: {
    asset: {
      _ref: string;
    };
  };
  images?: Array<{
    asset: {
      _ref: string;
    };
    hotspot?: {
      x: number;
      y: number;
      height: number;
      width: number;
    };
    crop?: {
      top: number;
      bottom: number;
      left: number;
      right: number;
    };
  }>;
  price: number;
  compareAtPrice?: number;
  stockQuantity: number;
  category?: {
    title: string;
    slug: {
      current: string;
    };
  };
  tags?: string[];
}

// Form Types
export interface CategoryFormData {
  title: string;
  description?: string;
  parent?: string;
  isActive: boolean;
  sortOrder: number;
}

export interface ProductFormData {
  title: string;
  description?: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  sku?: string;
  barcode?: string;
  stockQuantity: number;
  isActive: boolean;
  isFeatured: boolean;
  tags?: string[];
}
