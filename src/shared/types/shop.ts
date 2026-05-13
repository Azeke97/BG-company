export type ShopCatalogSort = "new" | "price_asc" | "price_desc" | "title_asc";

export interface ShopCategorySummary {
  id: string;
  name: string;
  slug: string;
  productsCount: number;
}

export interface ShopProductListItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: number;
  oldPrice: number | null;
  stock: number;
  images: string[];
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

export interface ShopCatalogResponse {
  items: ShopProductListItem[];
  categories: ShopCategorySummary[];
  selectedCategory: {
    id: string;
    name: string;
    slug: string;
  } | null;
  total: number;
}

export interface ShopCheckoutRequest {
  customer: {
    name: string;
    phone: string;
    comment?: string;
  };
  items: Array<{
    productId: string;
    qty: number;
  }>;
  promoCode?: string;
}

export interface ShopCheckoutResponse {
  item: {
    id: string;
    number: string;
    subtotal: number;
    discountTotal: number;
    total: number;
    status: "NEW";
  };
}

export interface ShopPromoValidationResponse {
  code: string;
  subtotal: number;
  eligibleSubtotal: number;
  discount: number;
  total: number;
}
