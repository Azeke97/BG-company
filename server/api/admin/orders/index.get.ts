import { prisma } from "~~/server/utils/prisma";

export default defineEventHandler(async () => {
  const items = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
          isBlocked: true,
        },
      },
      items: {
        select: {
          id: true,
          title: true,
          qty: true,
          price: true,
          productId: true,
        },
      },
    },
  });

  return { items };
});
