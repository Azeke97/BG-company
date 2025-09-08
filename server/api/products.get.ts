import { prisma } from "~/server/utils/prisma";
export default defineEventHandler(async () => {
  const items = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      price: true,
      stock: true,
    },
  });
  return { items };
});
