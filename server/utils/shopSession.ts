import { randomBytes, createHash } from "node:crypto";
import { prisma } from "~~/server/utils/prisma";

// Сессия покупателя полностью независима от сессии админки: отдельная
// кука, отдельная проверка роли. Используем общую Prisma-модель `Session`
// (она уже не admin-специфична на уровне схемы), но различаем кук и роль,
// чтобы админский аккаунт не мог получить доступ как покупатель и наоборот.
export const SHOP_SESSION_COOKIE_NAME = "shop_session";
const SHOP_SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 дней

type H3EventLike = InstanceType<typeof H3Event>;

const hashToken = (token: string) =>
  createHash("sha256").update(token).digest("hex");

export const createShopSession = async (
  userId: string,
  event: H3EventLike,
): Promise<void> => {
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SHOP_SESSION_TTL_MS);

  await prisma.session.create({
    data: {
      tokenHash,
      userId,
      userAgent: getRequestHeader(event, "user-agent") ?? null,
      expiresAt,
    },
  });

  setCookie(event, SHOP_SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SHOP_SESSION_TTL_MS / 1000,
  });
};

export type ShopSessionUser = {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  role: "ADMIN" | "USER";
};

export const getShopSessionUser = async (
  event: H3EventLike,
): Promise<ShopSessionUser | null> => {
  const token = getCookie(event, SHOP_SESSION_COOKIE_NAME);
  if (!token) return null;

  const tokenHash = hashToken(token);
  const session = await prisma.session.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!session) return null;
  if (session.expiresAt.getTime() <= Date.now()) return null;
  if (session.user.role !== "USER") return null;
  if (session.user.isBlocked) return null;

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    phone: session.user.phone,
    role: session.user.role,
  };
};

export const destroyShopSession = async (event: H3EventLike): Promise<void> => {
  const token = getCookie(event, SHOP_SESSION_COOKIE_NAME);
  if (token) {
    const tokenHash = hashToken(token);
    await prisma.session.deleteMany({ where: { tokenHash } });
  }
  deleteCookie(event, SHOP_SESSION_COOKIE_NAME, { path: "/" });
};
