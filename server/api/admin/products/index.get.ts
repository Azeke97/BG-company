import { prisma } from "~~/server/utils/prisma";

export default defineEventHandler(async () => {
  const rows = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  const items = rows.map((item) => ({
    ...item,
    images: Array.isArray(item.images)
      ? item.images.filter(
          (entry): entry is string => typeof entry === "string",
        )
      : [],
  }));

  return { items };
});
