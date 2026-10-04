import { OrderStatus, PaymentStatus, Prisma } from "@prisma/client";
import { prisma } from "~~/server/utils/prisma";
import { asOptionalString } from "~~/server/utils/admin";
import { manualProvider } from "~~/server/utils/payment/manualProvider";

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

const asOptionalPaymentStatus = (value: unknown): PaymentStatus | undefined => {
  if (value === undefined) return undefined;
  if (Object.values(PaymentStatus).includes(value as PaymentStatus)) {
    return value as PaymentStatus;
  }
  throw createError({
    statusCode: 400,
    statusMessage: "Invalid payment status",
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
    paymentStatus?: PaymentStatus;
    adminComment?: string | null;
  }>(event);

  const status = asOptionalOrderStatus(body.status);
  const paymentStatus = asOptionalPaymentStatus(body.paymentStatus);
  const adminComment =
    body.adminComment === null ? null : asOptionalString(body.adminComment);

  const admin = event.context.admin!;

  try {
    const item = await prisma.$transaction(async (tx) => {
      const existing = await tx.order.findUniqueOrThrow({ where: { id } });

      const data: {
        status?: OrderStatus;
        adminComment?: string | null;
        paymentStatus?: PaymentStatus;
      } = {};

      if (status !== undefined) data.status = status;
      if (adminComment !== undefined || body.adminComment === null) {
        data.adminComment = adminComment ?? null;
      }
      // paymentStatus === "PAID" проводится через manualProvider ниже,
      // чтобы Payment и Order.paymentStatus не расходились; остальные
      // значения (например FAILED) — это не "подтверждение оплаты",
      // их можно выставлять напрямую.
      if (paymentStatus !== undefined && paymentStatus !== "PAID") {
        data.paymentStatus = paymentStatus;
      }

      if (Object.keys(data).length > 0) {
        await tx.order.update({
          where: { id },
          data,
        });
      }

      if (status !== undefined && status !== existing.status) {
        await tx.orderStatusHistory.create({
          data: {
            orderId: id,
            fromStatus: existing.status,
            toStatus: status,
            changedById: admin.id,
            comment: adminComment ?? undefined,
          },
        });
      }

      if (paymentStatus === "PAID") {
        await manualProvider.confirmManually(tx, {
          orderId: id,
          adminUserId: admin.id,
        });
      }

      return tx.order.findUniqueOrThrow({
        where: { id },
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
          payments: true,
          statusHistory: true,
        },
      });
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
