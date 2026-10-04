import { getShopSessionUser } from "~~/server/utils/shopSession";

export default defineEventHandler(async (event) => {
  const user = await getShopSessionUser(event);
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
    },
  };
});
