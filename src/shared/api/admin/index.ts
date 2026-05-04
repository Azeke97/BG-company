import type {
  AppliesTo,
  Category,
  Dashboard,
  Order,
  OrderStatus,
  Product,
  Promo,
  PromoType,
  User,
} from "~/shared/types/admin";

type CategoryPayload = {
  name: string;
  slug?: string;
  parentId?: string | null;
  sortOrder?: number;
  isActive?: boolean;
};

type ProductPayload = {
  title: string;
  slug?: string;
  description?: string | null;
  price: number;
  oldPrice?: number | null;
  sku?: string | null;
  stock?: number;
  isActive?: boolean;
  categoryId?: string | null;
  images?: string[];
};

type PromoPayload = {
  code: string;
  type: PromoType;
  value: number;
  appliesTo: AppliesTo;
  categoryId?: string | null;
  productIds?: string[];
  startsAt?: string | null;
  endsAt?: string | null;
  usageLimit?: number | null;
};

type PromoUpdatePayload = Omit<Partial<PromoPayload>, "code"> & {
  used?: number;
};

export const adminApi = {
  getDashboard(days = 14) {
    return $fetch<Dashboard>("/api/admin/dashboard", {
      params: {
        days,
      },
    });
  },

  listCategories() {
    return $fetch<{ items: Category[] }>("/api/admin/categories");
  },

  createCategory(payload: CategoryPayload) {
    return $fetch<{ item: Category }>("/api/admin/categories", {
      method: "POST",
      body: payload,
    });
  },

  updateCategory(id: string, payload: Partial<CategoryPayload>) {
    return $fetch<{ item: Category }>(`/api/admin/categories/${id}`, {
      method: "PATCH",
      body: payload,
    });
  },

  deleteCategory(id: string) {
    return $fetch<{ ok: boolean }>(`/api/admin/categories/${id}`, {
      method: "DELETE",
    });
  },

  listProducts() {
    return $fetch<{ items: Product[] }>("/api/admin/products");
  },

  createProduct(payload: ProductPayload) {
    return $fetch<{ item: Product }>("/api/admin/products", {
      method: "POST",
      body: payload,
    });
  },

  updateProduct(id: string, payload: Partial<ProductPayload>) {
    return $fetch<{ item: Product }>(`/api/admin/products/${id}`, {
      method: "PATCH",
      body: payload,
    });
  },

  deleteProduct(id: string) {
    return $fetch<{ ok: boolean }>(`/api/admin/products/${id}`, {
      method: "DELETE",
    });
  },

  listPromos() {
    return $fetch<{ items: Promo[] }>("/api/admin/promos");
  },

  createPromo(payload: PromoPayload) {
    return $fetch<{ item: Promo }>("/api/admin/promos", {
      method: "POST",
      body: payload,
    });
  },

  updatePromo(code: string, payload: PromoUpdatePayload) {
    return $fetch<{ item: Promo }>(`/api/admin/promos/${code}`, {
      method: "PATCH",
      body: payload,
    });
  },

  deletePromo(code: string) {
    return $fetch<{ ok: boolean }>(`/api/admin/promos/${code}`, {
      method: "DELETE",
    });
  },

  listOrders() {
    return $fetch<{ items: Order[] }>("/api/admin/orders");
  },

  updateOrder(
    id: string,
    payload: { status?: OrderStatus; adminComment?: string | null },
  ) {
    return $fetch<{ item: Order }>(`/api/admin/orders/${id}`, {
      method: "PATCH",
      body: payload,
    });
  },

  listUsers(q?: string) {
    const params = q && q.trim().length > 0 ? { q: q.trim() } : undefined;
    return $fetch<{ items: User[] }>("/api/admin/users", { params });
  },

  updateUser(id: string, isBlocked: boolean) {
    return $fetch<{ item: User }>(`/api/admin/users/${id}`, {
      method: "PATCH",
      body: {
        isBlocked,
      },
    });
  },
};
