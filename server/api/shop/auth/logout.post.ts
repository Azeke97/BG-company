import { destroyShopSession } from "~~/server/utils/shopSession";

export default defineEventHandler(async (event) => {
  await destroyShopSession(event);
  return { ok: true };
});
