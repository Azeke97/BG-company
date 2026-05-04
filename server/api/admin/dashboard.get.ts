import { OrderStatus } from "@prisma/client";
import { prisma } from "~~/server/utils/prisma";

const DAY_MS = 24 * 60 * 60 * 1000;

const toDayKey = (date: Date) => date.toISOString().slice(0, 10);

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const daysRaw = typeof query.days === "string" ? Number(query.days) : 14;
  const days =
    Number.isFinite(daysRaw) && daysRaw > 0 ? Math.min(daysRaw, 90) : 14;
  const from = new Date(Date.now() - days * DAY_MS);

  const orders = await prisma.order.findMany({
    where: {
      createdAt: { gte: from },
    },
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      status: true,
      total: true,
      createdAt: true,
      items: {
        select: {
          title: true,
          qty: true,
          price: true,
        },
      },
    },
  });

  const paidStatuses = new Set<OrderStatus>([
    OrderStatus.PAID,
    OrderStatus.COMPLETED,
  ]);

  const statusCounts: Record<string, number> = {};
  const salesMap = new Map<
    string,
    { day: string; orders: number; revenue: number }
  >();
  const topProductsMap = new Map<
    string,
    { title: string; qty: number; revenue: number }
  >();

  for (const order of orders) {
    statusCounts[order.status] = (statusCounts[order.status] ?? 0) + 1;

    const day = toDayKey(order.createdAt);
    const dayRow = salesMap.get(day) ?? {
      day,
      orders: 0,
      revenue: 0,
    };
    dayRow.orders += 1;
    if (paidStatuses.has(order.status)) {
      dayRow.revenue += order.total;
    }
    salesMap.set(day, dayRow);

    for (const item of order.items) {
      const key = item.title;
      const row = topProductsMap.get(key) ?? {
        title: item.title,
        qty: 0,
        revenue: 0,
      };
      row.qty += item.qty;
      row.revenue += item.price * item.qty;
      topProductsMap.set(key, row);
    }
  }

  const salesByDay = Array.from(salesMap.values()).sort((a, b) =>
    a.day.localeCompare(b.day),
  );
  const statusBreakdown = Object.entries(statusCounts).map(
    ([status, count]) => ({
      status,
      count,
    }),
  );
  const topProducts = Array.from(topProductsMap.values())
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);

  return {
    range: {
      days,
      from,
    },
    totals: {
      orders: orders.length,
      revenue: salesByDay.reduce((sum, row) => sum + row.revenue, 0),
    },
    salesByDay,
    statusBreakdown,
    topProducts,
  };
});
