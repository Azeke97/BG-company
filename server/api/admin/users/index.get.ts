import { prisma } from "~~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const q = typeof query.q === "string" ? query.q.trim() : "";

  const items = await prisma.user.findMany({
    where: q
      ? {
          OR: [
            {
              email: {
                contains: q,
                mode: "insensitive",
              },
            },
            {
              name: {
                contains: q,
                mode: "insensitive",
              },
            },
            {
              phone: {
                contains: q,
                mode: "insensitive",
              },
            },
          ],
        }
      : undefined,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      role: true,
      isBlocked: true,
      createdAt: true,
      _count: {
        select: {
          orders: true,
        },
      },
    },
    take: 200,
  });

  return { items };
});
