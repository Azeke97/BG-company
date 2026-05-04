import { prisma } from "~~/server/utils/prisma";

export default defineEventHandler(async () => {
  const items = await prisma.category.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: {
      _count: {
        select: {
          children: true,
          products: true,
        },
      },
    },
  });

  return { items };
});
