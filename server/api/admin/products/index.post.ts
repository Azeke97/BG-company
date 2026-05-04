import { Prisma } from "@prisma/client";
import { prisma } from "~~/server/utils/prisma";
import {
  asOptionalBool,
  asOptionalInt,
  asOptionalNullableString,
  asOptionalString,
  asString,
  toSlug,
} from "~~/server/utils/admin";

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    title?: string;
    slug?: string;
    description?: string;
    price?: number;
    oldPrice?: number | null;
    sku?: string;
    stock?: number;
    isActive?: boolean;
    categoryId?: string | null;
    images?: unknown;
  }>(event);

  const title = asString(body.title, "title");
  const slug = asOptionalString(body.slug) ?? toSlug(title);
  const description = asOptionalNullableString(body.description);
  const price = asOptionalInt(body.price, "price");
  const oldPrice = asOptionalInt(body.oldPrice, "oldPrice");
  const sku = asOptionalNullableString(body.sku);
  const stock = asOptionalInt(body.stock, "stock");
  const isActive = asOptionalBool(body.isActive);
  const categoryId = asOptionalNullableString(body.categoryId);
  const images = Array.isArray(body.images)
    ? body.images.filter((item): item is string => typeof item === "string")
    : [];

  if (price === undefined) {
    throw createError({
      statusCode: 400,
      statusMessage: "price is required",
    });
  }

  try {
    const item = await prisma.product.create({
      data: {
        title,
        slug,
        description: description ?? null,
        price,
        oldPrice: oldPrice ?? null,
        sku: sku ?? null,
        stock: stock ?? 0,
        isActive: isActive ?? true,
        categoryId: categoryId ?? null,
        images,
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
        statusMessage: "Product with this slug or SKU already exists",
      });
    }
    throw error;
  }
});
