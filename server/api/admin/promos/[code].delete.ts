import { Prisma } from "@prisma/client";
import { prisma } from "~~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, "code");
  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: "Promo code is required",
    });
  }

  try {
    await prisma.promoCode.delete({
      where: { code: code.toUpperCase() },
    });
    return { ok: true };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw createError({
        statusCode: 404,
        statusMessage: "Promo not found",
      });
    }
    throw error;
  }
});
