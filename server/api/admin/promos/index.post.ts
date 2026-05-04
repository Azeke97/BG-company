import { AppliesTo, Prisma, PromoType } from "@prisma/client";
import { prisma } from "~~/server/utils/prisma";
import {
  asOptionalDate,
  asOptionalInt,
  asOptionalNullableString,
  asOptionalStringArray,
  asString,
} from "~~/server/utils/admin";

const asPromoType = (value: unknown): PromoType => {
  if (value === PromoType.PERCENT || value === PromoType.FIXED) return value;
  throw createError({
    statusCode: 400,
    statusMessage: "type must be PERCENT or FIXED",
  });
};

const asAppliesTo = (value: unknown): AppliesTo => {
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
  const body = await readBody<{
    code?: string;
    type?: PromoType;
    value?: number;
    appliesTo?: AppliesTo;
    categoryId?: string | null;
    productIds?: string[];
    startsAt?: string | null;
    endsAt?: string | null;
    usageLimit?: number | null;
  }>(event);

  const code = asString(body.code, "code").toUpperCase();
  const type = asPromoType(body.type);
  const value = asOptionalInt(body.value, "value");
  const appliesTo = asAppliesTo(body.appliesTo);
  const categoryId = asOptionalNullableString(body.categoryId);
  const productIds = asOptionalStringArray(body.productIds) ?? [];
  const startsAt = asOptionalDate(body.startsAt, "startsAt");
  const endsAt = asOptionalDate(body.endsAt, "endsAt");
  const usageLimit = asOptionalInt(body.usageLimit, "usageLimit");

  if (value === undefined) {
    throw createError({
      statusCode: 400,
      statusMessage: "value is required",
    });
  }

  try {
    const item = await prisma.promoCode.create({
      data: {
        code,
        type,
        value,
        appliesTo,
        categoryId: categoryId ?? null,
        productIds,
        startsAt: startsAt ?? null,
        endsAt: endsAt ?? null,
        usageLimit: usageLimit ?? null,
      },
    });

    return { item };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw createError({
        statusCode: 409,
        statusMessage: "Promo with this code already exists",
      });
    }
    throw error;
  }
});
