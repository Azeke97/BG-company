import { prisma } from "~~/server/utils/prisma";

export default defineEventHandler(async () => {
  const items = await prisma.promoCode.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return { items };
});
