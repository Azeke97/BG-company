import { adminApi } from "~/shared/api";
import { useAdminUser } from "~/shared/helpers";

export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith("/admin")) return;
  if (to.path === "/admin/login") return;

  try {
    const { user } = await adminApi.me();
    useAdminUser().value = user;
  } catch {
    return navigateTo("/admin/login");
  }
});
