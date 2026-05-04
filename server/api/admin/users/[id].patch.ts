import { Prisma } from "@prisma/client";
import { prisma } from "~~/server/utils/prisma";
import { asOptionalBool } from "~~/server/utils/admin";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "User id is required",
    });
  }

  const body = await readBody<{
    isBlocked?: boolean;
  }>(event);

  const isBlocked = asOptionalBool(body.isBlocked);
  if (isBlocked === undefined) {
    throw createError({
      statusCode: 400,
      statusMessage: "isBlocked is required",
    });
  }

  try {
    const item = await prisma.user.update({
      where: { id },
      data: {
        isBlocked,
      },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        isBlocked: true,
      },
    });

    return { item };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
      });
    }
    throw error;
  }
});
