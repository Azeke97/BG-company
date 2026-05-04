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
      statusMessage: "Category id is required",
    });
  }

  const body = await readBody<{
    name?: string;
    slug?: string;
    parentId?: string | null;
    sortOrder?: number;
    isActive?: boolean;
  }>(event);

  const name = asOptionalString(body.name);
  const slugFromBody = asOptionalString(body.slug);
  const parentId = asOptionalNullableString(body.parentId);
  const sortOrder = asOptionalInt(body.sortOrder, "sortOrder");
  const isActive = asOptionalBool(body.isActive);

  const data: {
    name?: string;
    slug?: string;
    parentId?: string | null;
    sortOrder?: number;
    isActive?: boolean;
  } = {};

  if (name !== undefined) data.name = name;
  if (slugFromBody !== undefined) data.slug = slugFromBody;
  if (parentId !== undefined) data.parentId = parentId;
  if (sortOrder !== undefined) data.sortOrder = sortOrder;
  if (isActive !== undefined) data.isActive = isActive;

  if (data.slug === undefined && data.name) {
    data.slug = toSlug(data.name);
  }

  try {
    const item = await prisma.category.update({
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
        statusMessage: "Category not found",
      });
    }

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
