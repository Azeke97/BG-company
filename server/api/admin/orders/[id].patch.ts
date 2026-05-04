import { OrderStatus, Prisma } from "@prisma/client";
import { prisma } from "~~/server/utils/prisma";
import { asOptionalString } from "~~/server/utils/admin";

const asOptionalOrderStatus = (value: unknown): OrderStatus | undefined => {
  if (value === undefined) return undefined;
  if (Object.values(OrderStatus).includes(value as OrderStatus)) {
    return value as OrderStatus;
  }
  throw createError({
    statusCode: 400,
    statusMessage: "Invalid order status",
  });
};

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Order id is required",
    });
  }

  const body = await readBody<{
    status?: OrderStatus;
    adminComment?: string | null;
  }>(event);

  const status = asOptionalOrderStatus(body.status);
  const adminComment =
    body.adminComment === null ? null : asOptionalString(body.adminComment);

  const data: {
    status?: OrderStatus;
    adminComment?: string | null;
  } = {};

  if (status !== undefined) data.status = status;
  if (adminComment !== undefined || body.adminComment === null) {
    data.adminComment = adminComment ?? null;
  }

  try {
    const item = await prisma.order.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            isBlocked: true,
          },
        },
        items: true,
      },
    });
    return { item };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw createError({
        statusCode: 404,
        statusMessage: "Order not found",
      });
    }
    throw error;
  }
});
