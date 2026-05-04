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
    name?: string;
    slug?: string;
    parentId?: string | null;
    sortOrder?: number;
    isActive?: boolean;
  }>(event);

  const name = asString(body.name, "name");
  const slug = asOptionalString(body.slug) ?? toSlug(name);
  const parentId = asOptionalNullableString(body.parentId);
  const sortOrder = asOptionalInt(body.sortOrder, "sortOrder");
  const isActive = asOptionalBool(body.isActive);

  try {
    const item = await prisma.category.create({
      data: {
        name,
        slug,
        parentId: parentId ?? null,
        sortOrder: sortOrder ?? 0,
        isActive: isActive ?? true,
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
        statusMessage: "Category with this slug already exists",
      });
    }
    throw error;
  }
});
