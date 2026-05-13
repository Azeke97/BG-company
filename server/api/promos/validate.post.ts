import { prisma } from "~~/server/utils/prisma";
import {
  calculatePromoDiscount,
  ensurePromoIsActive,
} from "~~/server/utils/promo";

export default defineEventHandler(async (event) => {
  const { code, items } = await readBody<{
    code: string;
    items: { productId: string; qty: number }[];
  }>(event);

  const normalizedCode = (code || "").trim().toUpperCase();
  const promo = await prisma.promoCode.findUnique({
    where: { code: normalizedCode },
  });
  if (!promo)
    throw createError({
      statusCode: 404,
      statusMessage: "Invalid code",
    });

  ensurePromoIsActive(promo);

  const normalizedItems = Array.isArray(items)
    ? items
        .map((item) => ({
          productId: typeof item.productId === "string" ? item.productId : "",
          qty: Number(item.qty),
        }))
        .filter(
          (item) =>
            item.productId && Number.isInteger(item.qty) && item.qty > 0,
        )
    : [];

  if (normalizedItems.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "items are invalid",
    });
  }

  const productIds = Array.from(
    new Set(normalizedItems.map((item) => item.productId)),
  );
  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
      isActive: true,
    },
    select: {
      id: true,
      price: true,
      categoryId: true,
    },
  });

  const productMap = new Map(products.map((product) => [product.id, product]));
  const lines = normalizedItems.map((item) => {
    const product = productMap.get(item.productId);
    if (!product) {
      throw createError({
        statusCode: 404,
        statusMessage: `Product not found: ${item.productId}`,
      });
    }
    return {
      productId: item.productId,
      qty: item.qty,
      price: product.price,
      categoryId: product.categoryId,
    };
  });

  const { subtotal, eligibleSubtotal, discount, total } =
    calculatePromoDiscount(promo, lines);

  return {
    code: promo.code,
    subtotal,
    eligibleSubtotal,
    discount,
    total,
  };
});
