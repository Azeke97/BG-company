import { prisma } from "~~/server/utils/prisma";
import { asString } from "~~/server/utils/admin";
import {
  calculatePromoDiscount,
  ensurePromoIsActive,
} from "~~/server/utils/promo";

type CheckoutItemInput = {
  productId?: string;
  qty?: number;
};

const sanitizeOrderNumberPart = (value: number) =>
  String(value).padStart(2, "0");

const buildOrderNumber = () => {
  const now = new Date();
  const datePart = [
    now.getFullYear(),
    sanitizeOrderNumberPart(now.getMonth() + 1),
    sanitizeOrderNumberPart(now.getDate()),
  ].join("");
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `BG-${datePart}-${randomPart}`;
};

const createUniqueOrderNumber = async () => {
  for (let i = 0; i < 10; i++) {
    const candidate = buildOrderNumber();
    const exists = await prisma.order.findUnique({
      where: { number: candidate },
      select: { id: true },
    });
    if (!exists) {
      return candidate;
    }
  }

  throw createError({
    statusCode: 500,
    statusMessage: "Unable to generate order number",
  });
};

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    customer?: {
      name?: string;
      phone?: string;
      comment?: string;
    };
    items?: CheckoutItemInput[];
    promoCode?: string;
  }>(event);

  const customerName = asString(body.customer?.name, "customer.name");
  const customerPhone = asString(body.customer?.phone, "customer.phone");
  const customerComment =
    typeof body.customer?.comment === "string"
      ? body.customer.comment.trim()
      : "";
  const promoCode =
    typeof body.promoCode === "string"
      ? body.promoCode.trim().toUpperCase()
      : "";

  if (!Array.isArray(body.items) || body.items.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "items are required",
    });
  }

  const normalizedItems = body.items
    .map((item) => ({
      productId: typeof item.productId === "string" ? item.productId : "",
      qty: Number(item.qty),
    }))
    .filter((item) => Boolean(item.productId) && Number.isInteger(item.qty));

  if (normalizedItems.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "items are invalid",
    });
  }

  const itemsByProduct = new Map<string, number>();
  normalizedItems.forEach((item) => {
    if (item.qty <= 0) {
      return;
    }
    const current = itemsByProduct.get(item.productId) ?? 0;
    itemsByProduct.set(item.productId, current + item.qty);
  });

  if (itemsByProduct.size === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: "items are invalid",
    });
  }

  const productIds = Array.from(itemsByProduct.keys());
  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
      isActive: true,
    },
    select: {
      id: true,
      title: true,
      price: true,
      stock: true,
      sku: true,
      categoryId: true,
    },
  });

  const productMap = new Map(products.map((product) => [product.id, product]));

  for (const [productId, qty] of itemsByProduct) {
    const product = productMap.get(productId);
    if (!product) {
      throw createError({
        statusCode: 404,
        statusMessage: `Product not found: ${productId}`,
      });
    }

    if (product.stock < qty) {
      throw createError({
        statusCode: 409,
        statusMessage: `Not enough stock for ${product.title}`,
      });
    }
  }

  const number = await createUniqueOrderNumber();

  const subtotal = Array.from(itemsByProduct.entries()).reduce(
    (acc, [productId, qty]) => {
      const product = productMap.get(productId);
      return product ? acc + product.price * qty : acc;
    },
    0,
  );
  let discountTotal = 0;

  if (promoCode) {
    const promo = await prisma.promoCode.findUnique({
      where: { code: promoCode },
    });

    if (!promo) {
      throw createError({
        statusCode: 404,
        statusMessage: "Invalid code",
      });
    }

    ensurePromoIsActive(promo);

    const lines = Array.from(itemsByProduct.entries()).map(
      ([productId, qty]) => {
        const product = productMap.get(productId)!;
        return {
          productId,
          qty,
          price: product.price,
          categoryId: product.categoryId ?? null,
        };
      },
    );

    discountTotal = calculatePromoDiscount(promo, lines).discount;
  }

  const adminCommentLines = [
    `Client: ${customerName}`,
    `Phone: ${customerPhone}`,
    customerComment ? `Comment: ${customerComment}` : "",
  ].filter(Boolean);

  const order = await prisma.$transaction(async (tx) => {
    for (const [productId, qty] of itemsByProduct) {
      const updated = await tx.product.updateMany({
        where: {
          id: productId,
          stock: {
            gte: qty,
          },
        },
        data: {
          stock: {
            decrement: qty,
          },
        },
      });

      if (updated.count !== 1) {
        throw createError({
          statusCode: 409,
          statusMessage: "Stock changed, please retry",
        });
      }
    }

    if (promoCode && discountTotal > 0) {
      const promo = await tx.promoCode.findUnique({
        where: { code: promoCode },
        select: {
          usageLimit: true,
          used: true,
        },
      });

      if (!promo) {
        throw createError({
          statusCode: 404,
          statusMessage: "Invalid code",
        });
      }

      if (promo.usageLimit !== null && promo.used >= promo.usageLimit) {
        throw createError({
          statusCode: 409,
          statusMessage: "Usage limit reached",
        });
      }

      await tx.promoCode.update({
        where: { code: promoCode },
        data: {
          used: {
            increment: 1,
          },
        },
      });
    }

    return tx.order.create({
      data: {
        number,
        status: "NEW",
        paymentMethod: "CASH",
        subtotal,
        discountTotal,
        total: subtotal - discountTotal,
        adminComment: adminCommentLines.join("\n"),
        items: {
          create: Array.from(itemsByProduct.entries()).map(
            ([productId, qty]) => {
              const product = productMap.get(productId)!;
              return {
                productId,
                title: product.title,
                sku: product.sku ?? null,
                price: product.price,
                qty,
              };
            },
          ),
        },
      },
      select: {
        id: true,
        number: true,
        subtotal: true,
        discountTotal: true,
        total: true,
        status: true,
      },
    });
  });

  return { item: order };
});
