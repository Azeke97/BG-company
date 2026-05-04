import { Prisma } from "@prisma/client";
import { prisma } from "~~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Category id is required",
    });
  }

  try {
    await prisma.category.delete({
      where: { id },
    });
    return { ok: true };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw createError({
        statusCode: 404,
        statusMessage: "Category not found",
      });
    }
    throw error;
  }
});
