export type AdminUser = {
  id: string;
  email: string;
  name: string | null;
};

export const useAdminUser = () =>
  useState<AdminUser | null>("admin-user", () => null);
