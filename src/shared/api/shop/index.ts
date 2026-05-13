import type {
  ShopCatalogResponse,
  ShopCatalogSort,
  ShopCheckoutRequest,
  ShopCheckoutResponse,
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
};
