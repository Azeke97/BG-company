import { defineStore } from "pinia";
import { StorageKeys } from "~/shared/constants";
import type { ShopCartAddPayload, ShopCartItem } from "./types";

const parseStoredCart = (): ShopCartItem[] => {
  if (!import.meta.client) {
    return [];
  }

  try {
    const raw = localStorage.getItem(StorageKeys.ShopCart);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((entry) => entry as Partial<ShopCartItem>)
      .filter((entry) => Boolean(entry.id && entry.title))
      .map((entry) => ({
        id: String(entry.id),
        slug: String(entry.slug ?? ""),
        title: String(entry.title),
        price: Number(entry.price) || 0,
        stock: Number(entry.stock) || 0,
        image: String(entry.image ?? ""),
        qty: Math.max(1, Number(entry.qty) || 1),
      }));
  } catch {
    return [];
  }
};

export const useShopCartStore = defineStore("shop-cart", () => {
  const items = ref<ShopCartItem[]>(parseStoredCart());

  if (import.meta.client) {
    watch(
      items,
      (value) => {
        localStorage.setItem(StorageKeys.ShopCart, JSON.stringify(value));
      },
      { deep: true },
    );
  }

  const count = computed(() =>
    items.value.reduce((acc: number, item: ShopCartItem) => acc + item.qty, 0),
  );

  const total = computed(() =>
    items.value.reduce(
      (acc: number, item: ShopCartItem) => acc + item.price * item.qty,
      0,
    ),
  );

  const addItem = (payload: ShopCartAddPayload) => {
    if (payload.stock <= 0) {
      return;
    }

    const existing = items.value.find((item) => item.id === payload.id);

    if (existing) {
      const maxQty = Math.max(existing.stock, 1);
      existing.qty = Math.min(existing.qty + 1, maxQty);
      return;
    }

    items.value.push({
      id: payload.id,
      slug: payload.slug,
      title: payload.title,
      price: payload.price,
      stock: payload.stock,
      image: payload.images[0] ?? "",
      qty: 1,
    });
  };

  const setQty = (productId: string, qty: number) => {
    const item = items.value.find((entry) => entry.id === productId);
    if (!item) {
      return;
    }

    const normalized = Math.max(1, Math.floor(qty));
    item.qty = Math.min(normalized, Math.max(item.stock, 1));
  };

  const increment = (productId: string) => {
    const item = items.value.find((entry) => entry.id === productId);
    if (!item) {
      return;
    }

    setQty(productId, item.qty + 1);
  };

  const decrement = (productId: string) => {
    const item = items.value.find((entry) => entry.id === productId);
    if (!item) {
      return;
    }

    if (item.qty <= 1) {
      removeItem(productId);
      return;
    }

    setQty(productId, item.qty - 1);
  };

  const removeItem = (productId: string) => {
    items.value = items.value.filter(
      (item: ShopCartItem) => item.id !== productId,
    );
  };

  const clear = () => {
    items.value = [];
  };

  return {
    items,
    count,
    total,
    addItem,
    setQty,
    increment,
    decrement,
    removeItem,
    clear,
  };
});
