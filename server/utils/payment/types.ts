// Провайдер-агностичный контракт оплаты заказа.
//
// ВАЖНО: в этом проекте реальная онлайн-оплата (Kaspi QR, банковская карта)
// НЕ реализуется. Значения `KASPI_QR`/`CARD` оставлены в enum `PaymentMethod`
// как зарезервированная точка расширения на будущее — сейчас единственный
// рабочий метод подтверждения оплаты — ручной, менеджером в админке
// (см. `manualProvider.ts`).
import type {
  Payment,
  PaymentMethod,
  PaymentStatus,
  Prisma,
} from "@prisma/client";
import type { prisma } from "~~/server/utils/prisma";

// Любая операция провайдера должна уметь работать и с обычным `prisma`,
// и с transaction-клиентом `tx` внутри `prisma.$transaction` — вызывающий
// код сам решает, в какой клиент передать.
export type PrismaClientOrTx = typeof prisma | Prisma.TransactionClient;

export interface CreatePaymentParams {
  orderId: string;
  method: PaymentMethod;
  amount: number;
  currency?: string;
  createdById?: string;
}

export interface ConfirmManuallyParams {
  orderId: string;
  adminUserId: string;
  comment?: string;
}

export interface PaymentProvider {
  name: string;
  createPayment(
    client: PrismaClientOrTx,
    params: CreatePaymentParams,
  ): Promise<Payment>;
  confirmManually(
    client: PrismaClientOrTx,
    params: ConfirmManuallyParams,
  ): Promise<Payment>;
  getStatus(client: PrismaClientOrTx, orderId: string): Promise<PaymentStatus>;
}
