export type ShopUser = {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
};

export const useShopUser = () =>
  useState<ShopUser | null>("shop-user", () => null);
