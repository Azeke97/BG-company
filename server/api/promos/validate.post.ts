import { prisma } from "~~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const { code, items } = await readBody<{
    code: string;
    items: { productId: string; price: number; qty: number }[];
  }>(event);

  const promo = await prisma.promoCode.findUnique({ where: { code } });
  if (!promo)
    throw createError({
      statusCode: 404,
      statusMessage: "Invalid code",
    });

  const now = new Date();
  if (promo.startsAt && promo.startsAt > now)
    throw createError({
      statusCode: 400,
      statusMessage: "Not started",
    });
  if (promo.endsAt && promo.endsAt < now)
    throw createError({
      statusCode: 400,
      statusMessage: "Expired",
    });
  if (promo.usageLimit && promo.used >= promo.usageLimit)
    throw createError({
      statusCode: 400,
      statusMessage: "Usage limit reached",
    });

  // применим к подходящим позициям (упрощённо: ко всем)
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discount =
    promo.type === "PERCENT"
      ? Math.floor((subtotal * promo.value) / 100)
      : Math.min(subtotal, promo.value);

  return {
    code: promo.code,
    discount,
  };
});
