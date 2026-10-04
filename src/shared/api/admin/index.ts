import { useBaseApi } from "~/shared/api/useBaseApi";
import { globalCatchInterceptor } from "~/shared/api/globalCatchInterceptor";
import { globalThenInterceptor } from "~/shared/api/globalThenInterceptor";
import type {
  AppliesTo,
  Category,
  Dashboard,
  Order,
  OrderStatus,
  PaymentStatus,
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
  login(email: string, password: string) {
    return useBaseApi<{
      user: { id: string; email: string; name: string | null };
    }>("/api/admin/auth/login", {
      method: "POST",
      data: {
        email,
        password,
      },
    });
  },

  logout() {
    return useBaseApi<{ ok: boolean }>("/api/admin/auth/logout", {
      method: "POST",
    });
  },

  me() {
    return useBaseApi<{
      user: { id: string; email: string; name: string | null; role: string };
    }>("/api/admin/auth/me");
  },

  getDashboard(days = 14) {
    return useBaseApi<Dashboard>("/api/admin/dashboard", {
      data: { days },
    });
  },

  listCategories() {
    return useBaseApi<{ items: Category[] }>("/api/admin/categories");
  },

  createCategory(payload: CategoryPayload) {
    return useBaseApi<{ item: Category }>("/api/admin/categories", {
      method: "POST",
      data: payload,
    });
  },

  updateCategory(id: string, payload: Partial<CategoryPayload>) {
    return useBaseApi<{ item: Category }>(`/api/admin/categories/${id}`, {
      method: "PATCH",
      data: payload,
    });
  },

  deleteCategory(id: string) {
    return useBaseApi<{ ok: boolean }>(`/api/admin/categories/${id}`, {
      method: "DELETE",
    });
  },

  listProducts() {
    return useBaseApi<{ items: Product[] }>("/api/admin/products");
  },

  createProduct(payload: ProductPayload) {
    return useBaseApi<{ item: Product }>("/api/admin/products", {
      method: "POST",
      data: payload,
    });
  },

  updateProduct(id: string, payload: Partial<ProductPayload>) {
    return useBaseApi<{ item: Product }>(`/api/admin/products/${id}`, {
      method: "PATCH",
      data: payload,
    });
  },

  deleteProduct(id: string) {
    return useBaseApi<{ ok: boolean }>(`/api/admin/products/${id}`, {
      method: "DELETE",
    });
  },

  bulkUpdateProducts(ids: string[], isActive: boolean) {
    return useBaseApi<{ count: number }>("/api/admin/products/bulk", {
      method: "PATCH",
      data: {
        ids,
        isActive,
      },
    });
  },

  // useBaseApi/makeFetchConfig сериализует data через JSON.parse(JSON.stringify(...)),
  // что превращает FormData в "{}" — поэтому загрузка файла идёт напрямую через $fetch.
  uploadProductImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return $fetch<{ url: string }>("/api/admin/uploads", {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then(globalThenInterceptor)
      .catch(globalCatchInterceptor);
  },

  listPromos() {
    return useBaseApi<{ items: Promo[] }>("/api/admin/promos");
  },

  createPromo(payload: PromoPayload) {
    return useBaseApi<{ item: Promo }>("/api/admin/promos", {
      method: "POST",
      data: payload,
    });
  },

  updatePromo(code: string, payload: PromoUpdatePayload) {
    return useBaseApi<{ item: Promo }>(`/api/admin/promos/${code}`, {
      method: "PATCH",
      data: payload,
    });
  },

  deletePromo(code: string) {
    return useBaseApi<{ ok: boolean }>(`/api/admin/promos/${code}`, {
      method: "DELETE",
    });
  },

  listOrders() {
    return useBaseApi<{ items: Order[] }>("/api/admin/orders");
  },

  updateOrder(
    id: string,
    payload: {
      status?: OrderStatus;
      paymentStatus?: PaymentStatus;
      adminComment?: string | null;
    },
  ) {
    return useBaseApi<{ item: Order }>(`/api/admin/orders/${id}`, {
      method: "PATCH",
      data: payload,
    });
  },

  listUsers(q?: string) {
    const data = q && q.trim().length > 0 ? { q: q.trim() } : undefined;
    return useBaseApi<{ items: User[] }>("/api/admin/users", { data });
  },

  updateUser(id: string, isBlocked: boolean) {
    return useBaseApi<{ item: User }>(`/api/admin/users/${id}`, {
      method: "PATCH",
      data: {
        isBlocked,
      },
    });
  },
};
