import { getSessionUser } from "~~/server/utils/session";

export default defineEventHandler(async (event) => {
  if (!event.path.startsWith("/api/admin/")) return;
  if (event.path.startsWith("/api/admin/auth/")) return;

  const user = await getSessionUser(event);
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  event.context.admin = user;
});
