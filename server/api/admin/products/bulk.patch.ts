import { prisma } from "~~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ ids?: unknown; isActive?: unknown }>(event);

  const ids = Array.isArray(body.ids)
    ? body.ids.filter((item): item is string => typeof item === "string")
    : [];
  if (ids.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "ids must be a non-empty array of strings",
    });
  }

  if (typeof body.isActive !== "boolean") {
    throw createError({
      statusCode: 400,
      statusMessage: "isActive must be boolean",
    });
  }

  const result = await prisma.product.updateMany({
    where: { id: { in: ids } },
    data: { isActive: body.isActive },
  });

  return { count: result.count };
});
