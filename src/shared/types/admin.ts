export type PromoType = "PERCENT" | "FIXED";
export type AppliesTo = "ALL" | "CATEGORY" | "PRODUCTS";
export type Role = "ADMIN" | "USER";
export type OrderStatus =
  | "NEW"
  | "PROCESSING"
  | "PAID"
  | "COMPLETED"
  | "CANCELLED"
  | "DRAFT"
  | "PENDING";

export interface CategoryCounters {
  children: number;
  products: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  sortOrder: number;
  isActive: boolean;
  _count?: CategoryCounters;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  price: number;
  oldPrice?: number | null;
  sku?: string | null;
  stock: number;
  isActive: boolean;
  categoryId: string | null;
  images: string[];
  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

export interface Promo {
  code: string;
  type: PromoType;
  value: number;
  appliesTo: AppliesTo;
  categoryId: string | null;
  productIds: string[];
  startsAt: string | null;
  endsAt: string | null;
  usageLimit: number | null;
  used: number;
}

export interface OrderItem {
  id: string;
  title: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  number: string;
  status: OrderStatus;
  total: number;
  subtotal: number;
  discountTotal: number;
  createdAt: string;
  adminComment: string | null;
  user: {
    id: string;
    email: string;
    name: string | null;
    isBlocked: boolean;
  } | null;
  items: OrderItem[];
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  role: Role;
  isBlocked: boolean;
  createdAt: string;
  _count: {
    orders: number;
  };
}

export interface Dashboard {
  range?: {
    days: number;
    from: string;
  };
  totals: {
    orders: number;
    revenue: number;
  };
  salesByDay: Array<{
    day: string;
    orders: number;
    revenue: number;
  }>;
  statusBreakdown: Array<{
    status: string;
    count: number;
  }>;
  topProducts: Array<{
    title: string;
    qty: number;
    revenue: number;
  }>;
}
