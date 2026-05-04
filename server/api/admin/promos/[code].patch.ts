import { AppliesTo, Prisma, PromoType } from "@prisma/client";
import { prisma } from "~~/server/utils/prisma";
import {
  asOptionalDate,
  asOptionalInt,
  asOptionalNullableString,
  asOptionalStringArray,
} from "~~/server/utils/admin";

const asOptionalPromoType = (value: unknown): PromoType | undefined => {
  if (value === undefined) return undefined;
  if (value === PromoType.PERCENT || value === PromoType.FIXED) return value;
  throw createError({
    statusCode: 400,
    statusMessage: "type must be PERCENT or FIXED",
  });
};

const asOptionalAppliesTo = (value: unknown): AppliesTo | undefined => {
  if (value === undefined) return undefined;
  if (
    value === AppliesTo.ALL ||
    value === AppliesTo.CATEGORY ||
    value === AppliesTo.PRODUCTS
  ) {
    return value;
  }
  throw createError({
    statusCode: 400,
    statusMessage: "appliesTo must be ALL, CATEGORY, PRODUCTS",
  });
};

export default defineEventHandler(async (event) => {
  const code = getRouterParam(event, "code");
  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: "Promo code is required",
    });
  }

  const body = await readBody<{
    type?: PromoType;
    value?: number;
    appliesTo?: AppliesTo;
    categoryId?: string | null;
    productIds?: string[];
    startsAt?: string | null;
    endsAt?: string | null;
    usageLimit?: number | null;
    used?: number;
  }>(event);

  const type = asOptionalPromoType(body.type);
  const value = asOptionalInt(body.value, "value");
  const appliesTo = asOptionalAppliesTo(body.appliesTo);
  const categoryId = asOptionalNullableString(body.categoryId);
  const productIds = asOptionalStringArray(body.productIds);
  const startsAt = asOptionalDate(body.startsAt, "startsAt");
  const endsAt = asOptionalDate(body.endsAt, "endsAt");
  const usageLimit = asOptionalInt(body.usageLimit, "usageLimit");
  const used = asOptionalInt(body.used, "used");

  const data: {
    type?: PromoType;
    value?: number;
    appliesTo?: AppliesTo;
    categoryId?: string | null;
    productIds?: string[];
    startsAt?: Date | null;
    endsAt?: Date | null;
    usageLimit?: number | null;
    used?: number;
  } = {};

  if (type !== undefined) data.type = type;
  if (value !== undefined) data.value = value;
  if (appliesTo !== undefined) data.appliesTo = appliesTo;
  if (categoryId !== undefined) data.categoryId = categoryId;
  if (productIds !== undefined) data.productIds = productIds;
  if (startsAt !== undefined) data.startsAt = startsAt;
  if (endsAt !== undefined) data.endsAt = endsAt;
  if (usageLimit !== undefined) data.usageLimit = usageLimit;
  if (used !== undefined) data.used = used;

  try {
    const item = await prisma.promoCode.update({
      where: { code: code.toUpperCase() },
      data,
    });
    return { item };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw createError({
        statusCode: 404,
        statusMessage: "Promo not found",
      });
    }
    throw error;
  }
});
