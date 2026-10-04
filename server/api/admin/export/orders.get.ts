import { prisma } from "~~/server/utils/prisma";

const csvEscape = (value: unknown): string => {
  const str = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const daysRaw = typeof query.days === "string" ? Number(query.days) : null;
  const days = Number.isFinite(daysRaw) && daysRaw! > 0 ? daysRaw : null;

  const orders = await prisma.order.findMany({
    where: days
      ? {
          createdAt: { gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000) },
        }
      : undefined,
    orderBy: { createdAt: "desc" },
    select: {
      number: true,
      createdAt: true,
      status: true,
      paymentStatus: true,
      customerName: true,
      customerPhone: true,
      subtotal: true,
      discountTotal: true,
      total: true,
      paymentMethod: true,
    },
  });

  const header = [
    "Номер",
    "Дата",
    "Статус",
    "Статус оплаты",
    "Клиент",
    "Телефон",
    "Способ оплаты",
    "Подытог",
    "Скидка",
    "Итого",
  ];

  const rows = orders.map((order) => [
    order.number,
    order.createdAt.toISOString(),
    order.status,
    order.paymentStatus,
    order.customerName,
    order.customerPhone,
    order.paymentMethod ?? "",
    order.subtotal,
    order.discountTotal,
    order.total,
  ]);

  const csv = [header, ...rows]
    .map((row) => row.map(csvEscape).join(","))
    .join("\n");

  setHeader(event, "Content-Type", "text/csv; charset=utf-8");
  setHeader(event, "Content-Disposition", 'attachment; filename="orders.csv"');

  const bom = String.fromCharCode(0xfeff);
  return bom + csv;
});
