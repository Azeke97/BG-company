import { Prisma } from "@prisma/client";
import { prisma } from "~~/server/utils/prisma";
import {
  asOptionalBool,
  asOptionalInt,
  asOptionalNullableString,
  asOptionalString,
  toSlug,
} from "~~/server/utils/admin";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Product id is required",
    });
  }

  const body = await readBody<{
    title?: string;
    slug?: string;
    description?: string | null;
    price?: number;
    oldPrice?: number | null;
    sku?: string | null;
    stock?: number;
    isActive?: boolean;
    categoryId?: string | null;
    images?: unknown;
  }>(event);

  const title = asOptionalString(body.title);
  const slugFromBody = asOptionalString(body.slug);
  const description = asOptionalNullableString(body.description);
  const price = asOptionalInt(body.price, "price");
  const oldPrice = asOptionalInt(body.oldPrice, "oldPrice");
  const sku = asOptionalNullableString(body.sku);
  const stock = asOptionalInt(body.stock, "stock");
  const isActive = asOptionalBool(body.isActive);
  const categoryId = asOptionalNullableString(body.categoryId);
  const images = Array.isArray(body.images)
    ? body.images.filter((item): item is string => typeof item === "string")
    : undefined;

  const data: {
    title?: string;
    slug?: string;
    description?: string | null;
    price?: number;
    oldPrice?: number | null;
    sku?: string | null;
    stock?: number;
    isActive?: boolean;
    categoryId?: string | null;
    images?: string[];
  } = {};

  if (title !== undefined) data.title = title;
  if (slugFromBody !== undefined) data.slug = slugFromBody;
  if (description !== undefined) data.description = description;
  if (price !== undefined) data.price = price;
  if (oldPrice !== undefined) data.oldPrice = oldPrice;
  if (sku !== undefined) data.sku = sku;
  if (stock !== undefined) data.stock = stock;
  if (isActive !== undefined) data.isActive = isActive;
  if (categoryId !== undefined) data.categoryId = categoryId;
  if (images !== undefined) data.images = images;

  if (data.slug === undefined && data.title) {
    data.slug = toSlug(data.title);
  }

  try {
    const item = await prisma.product.update({
      where: { id },
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
        statusMessage: "Product not found",
      });
    }

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      throw createError({
        statusCode: 409,
        statusMessage: "Product with this slug or SKU already exists",
      });
    }

    throw error;
  }
});
