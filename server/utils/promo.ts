import type { PromoCode } from "@prisma/client";

type PromoLine = {
  productId: string;
  qty: number;
  price: number;
  categoryId: string | null;
};

export const ensurePromoIsActive = (promo: PromoCode) => {
  const now = new Date();

  if (promo.startsAt && promo.startsAt > now) {
    throw createError({
      statusCode: 400,
      statusMessage: "Not started",
    });
  }

  if (promo.endsAt && promo.endsAt < now) {
    throw createError({
      statusCode: 400,
      statusMessage: "Expired",
    });
  }

  if (promo.usageLimit !== null && promo.used >= promo.usageLimit) {
    throw createError({
      statusCode: 400,
      statusMessage: "Usage limit reached",
    });
  }
};

const isEligibleLine = (promo: PromoCode, line: PromoLine) => {
  if (promo.appliesTo === "ALL") {
    return true;
  }

  if (promo.appliesTo === "CATEGORY") {
    return Boolean(promo.categoryId && line.categoryId === promo.categoryId);
  }

  if (promo.appliesTo === "PRODUCTS") {
    return promo.productIds.includes(line.productId);
  }

  return false;
};

export const calculatePromoDiscount = (
  promo: PromoCode,
  lines: PromoLine[],
) => {
  const subtotal = lines.reduce((acc, line) => acc + line.price * line.qty, 0);
  const eligibleSubtotal = lines
    .filter((line) => isEligibleLine(promo, line))
    .reduce((acc, line) => acc + line.price * line.qty, 0);

  const discountRaw =
    promo.type === "PERCENT"
      ? Math.floor((eligibleSubtotal * promo.value) / 100)
      : Math.min(eligibleSubtotal, promo.value);

  const discount = Math.max(0, Math.min(discountRaw, subtotal));

  return {
    subtotal,
    eligibleSubtotal,
    discount,
    total: subtotal - discount,
  };
};
