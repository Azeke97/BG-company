import { setUnauthorizedHandler } from "~/shared/api";

export default defineNuxtPlugin(() => {
  setUnauthorizedHandler(() => {
    navigateTo("/admin/login");
  });
});
