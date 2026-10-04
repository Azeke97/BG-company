import type { Payment, PaymentStatus } from "@prisma/client";
import type {
  ConfirmManuallyParams,
  CreatePaymentParams,
  PaymentProvider,
  PrismaClientOrTx,
} from "~~/server/utils/payment/types";

// Единственный рабочий провайдер оплаты в этом проекте: оплата "наличными"
// или "по счёту" подтверждается менеджером вручную в админке, никакого
// внешнего эквайринга тут нет.
export const manualProvider: PaymentProvider = {
  name: "MANUAL",

  async createPayment(
    client: PrismaClientOrTx,
    params: CreatePaymentParams,
  ): Promise<Payment> {
    return client.payment.create({
      data: {
        orderId: params.orderId,
        provider: "MANUAL",
        method: params.method,
        amount: params.amount,
        currency: params.currency ?? "KZT",
        status: "PENDING",
        createdById: params.createdById ?? null,
      },
    });
  },

  async confirmManually(
    client: PrismaClientOrTx,
    params: ConfirmManuallyParams,
  ): Promise<Payment> {
    const order = await client.order.findUniqueOrThrow({
      where: { id: params.orderId },
    });

    const lastPayment = await client.payment.findFirst({
      where: { orderId: params.orderId },
      orderBy: { createdAt: "desc" },
    });

    const payment = lastPayment
      ? await client.payment.update({
          where: { id: lastPayment.id },
          data: {
            status: "PAID",
            createdById: params.adminUserId,
          },
        })
      : await client.payment.create({
          data: {
            orderId: params.orderId,
            provider: "MANUAL",
            method: order.paymentMethod ?? "CASH",
            amount: order.total,
            currency: "KZT",
            status: "PAID",
            createdById: params.adminUserId,
          },
        });

    // Держим Order.paymentStatus консистентным с Payment.status в одном месте,
    // чтобы вызывающий код не дублировал эту логику.
    await client.order.update({
      where: { id: params.orderId },
      data: { paymentStatus: "PAID" },
    });

    return payment;
  },

  async getStatus(
    client: PrismaClientOrTx,
    orderId: string,
  ): Promise<PaymentStatus> {
    const order = await client.order.findUniqueOrThrow({
      where: { id: orderId },
      select: { paymentStatus: true },
    });
    return order.paymentStatus;
  },
};
