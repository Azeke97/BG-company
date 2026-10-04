import type {
  ShopCatalogResponse,
  ShopCatalogSort,
  ShopCheckoutRequest,
  ShopCheckoutResponse,
  ShopProductResponse,
  ShopPromoValidationResponse,
} from "~/shared/types/shop";

type CatalogParams = {
  q?: string;
  sort?: ShopCatalogSort;
  categorySlug?: string;
};

export const shopApi = {
  async getCatalog(params?: CatalogParams) {
    return $fetch<ShopCatalogResponse>("/api/shop/catalog", {
      params: {
        q: params?.q || undefined,
        sort: params?.sort || undefined,
        category: params?.categorySlug || undefined,
      },
    });
  },
  async checkout(payload: ShopCheckoutRequest) {
    return $fetch<ShopCheckoutResponse>("/api/shop/orders", {
      method: "POST",
      body: payload,
    });
  },
  async validatePromo(payload: {
    code: string;
    items: Array<{ productId: string; qty: number }>;
  }) {
    return $fetch<ShopPromoValidationResponse>("/api/promos/validate", {
      method: "POST",
      body: payload,
    });
  },
  async getProduct(slug: string) {
    return $fetch<ShopProductResponse>(`/api/shop/products/${slug}`);
  },
  async requestCode(email: string) {
    return $fetch<{ ok: boolean; devCode?: string }>(
      "/api/shop/auth/request-code",
      {
        method: "POST",
        body: { email },
      },
    );
  },
  async verifyCode(email: string, code: string) {
    return $fetch<{
      user: {
        id: string;
        email: string;
        name: string | null;
        phone: string | null;
      };
    }>("/api/shop/auth/verify-code", {
      method: "POST",
      body: {
        email,
        code,
      },
    });
  },
  async shopLogout() {
    return $fetch<{ ok: boolean }>("/api/shop/auth/logout", {
      method: "POST",
    });
  },
  async shopMe() {
    return $fetch<{
      user: {
        id: string;
        email: string;
        name: string | null;
        phone: string | null;
      };
    }>("/api/shop/auth/me");
  },
};
