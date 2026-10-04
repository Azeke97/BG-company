import { prisma } from "~~/server/utils/prisma";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  if (!slug) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }

  const product = await prisma.product.findFirst({
    where: {
      slug,
      isActive: true,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      price: true,
      oldPrice: true,
      sku: true,
      stock: true,
      images: true,
      attrs: true,
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  });

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: "Product not found",
    });
  }

  const item = {
    ...product,
    images: Array.isArray(product.images)
      ? product.images.filter(
          (entry): entry is string => typeof entry === "string",
        )
      : [],
    attrs:
      product.attrs && typeof product.attrs === "object"
        ? (product.attrs as Record<string, unknown>)
        : {},
  };

  return { item };
});
