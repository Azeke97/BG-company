import { prisma } from "~~/server/utils/prisma";

type ShopSort = "new" | "price_asc" | "price_desc" | "title_asc";

const SORT_VALUES: ShopSort[] = ["new", "price_asc", "price_desc", "title_asc"];

function asShopSort(value: unknown): ShopSort {
  if (typeof value !== "string") {
    return "new";
  }

  return SORT_VALUES.includes(value as ShopSort) ? (value as ShopSort) : "new";
}

function asNonEmptyString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const search = asNonEmptyString(query.q);
  const categorySlug = asNonEmptyString(query.category);
  const sort = asShopSort(query.sort);

  const selectedCategory = categorySlug
    ? await prisma.category.findFirst({
        where: {
          slug: categorySlug,
          isActive: true,
        },
        select: {
          id: true,
          name: true,
          slug: true,
        },
      })
    : null;

  if (categorySlug && !selectedCategory) {
    throw createError({
      statusCode: 404,
      statusMessage: "Category not found",
    });
  }

  const productWhere = {
    isActive: true,
    ...(search
      ? {
          OR: [
            {
              title: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              description: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {}),
    ...(selectedCategory ? { categoryId: selectedCategory.id } : {}),
  };

  const orderBy =
    sort === "price_asc"
      ? { price: "asc" as const }
      : sort === "price_desc"
        ? { price: "desc" as const }
        : sort === "title_asc"
          ? { title: "asc" as const }
          : { createdAt: "desc" as const };

  const [rows, categories, groupedCounts] = await Promise.all([
    prisma.product.findMany({
      where: productWhere,
      orderBy,
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        price: true,
        oldPrice: true,
        stock: true,
        images: true,
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    }),
    prisma.category.findMany({
      where: {
        isActive: true,
      },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      select: {
        id: true,
        name: true,
        slug: true,
      },
    }),
    prisma.product.groupBy({
      by: ["categoryId"],
      where: {
        isActive: true,
        categoryId: {
          not: null,
        },
      },
      _count: {
        _all: true,
      },
    }),
  ]);

  const productsCountByCategory = new Map(
    groupedCounts.map((item) => [item.categoryId, item._count._all]),
  );

  const items = rows.map((row) => ({
    ...row,
    images: Array.isArray(row.images)
      ? row.images.filter((item): item is string => typeof item === "string")
      : [],
  }));

  return {
    items,
    categories: categories.map((category) => ({
      ...category,
      productsCount: productsCountByCategory.get(category.id) ?? 0,
    })),
    selectedCategory,
    total: items.length,
  };
});
