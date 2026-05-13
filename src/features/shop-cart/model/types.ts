import type { ShopProductListItem } from "~/shared/types/shop";

export interface ShopCartItem {
  id: string;
  slug: string;
  title: string;
  price: number;
  stock: number;
  image: string;
  qty: number;
}

export type ShopCartAddPayload = Pick<
  ShopProductListItem,
  "id" | "slug" | "title" | "price" | "stock" | "images"
>;
