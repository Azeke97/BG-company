import { randomBytes, createHash } from "node:crypto";
import { prisma } from "~~/server/utils/prisma";

export const SESSION_COOKIE_NAME = "admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 дней

// H3Event доступен как глобал от Nitro (без импорта); берём инстанс-тип
// через него, чтобы не плодить конфликт типов с посторонним h3@2.x,
// который случайно поднялся в корень node_modules транзитивной зависимостью.
type H3EventLike = InstanceType<typeof H3Event>;

const hashToken = (token: string) =>
  createHash("sha256").update(token).digest("hex");

export const createSession = async (
  userId: string,
  event: H3EventLike,
): Promise<void> => {
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await prisma.session.create({
    data: {
      tokenHash,
      userId,
      userAgent: getRequestHeader(event, "user-agent") ?? null,
      expiresAt,
    },
  });

  setCookie(event, SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
};

export type SessionUser = {
  id: string;
  email: string;
  name: string | null;
  role: "ADMIN" | "USER";
};

export const getSessionUser = async (
  event: H3EventLike,
): Promise<SessionUser | null> => {
  const token = getCookie(event, SESSION_COOKIE_NAME);
  if (!token) return null;

  const tokenHash = hashToken(token);
  const session = await prisma.session.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!session) return null;
  if (session.expiresAt.getTime() <= Date.now()) return null;
  if (session.user.role !== "ADMIN") return null;
  if (session.user.isBlocked) return null;

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    role: session.user.role,
  };
};

export const destroySession = async (event: H3EventLike): Promise<void> => {
  const token = getCookie(event, SESSION_COOKIE_NAME);
  if (token) {
    const tokenHash = hashToken(token);
    await prisma.session.deleteMany({ where: { tokenHash } });
  }
  deleteCookie(event, SESSION_COOKIE_NAME, { path: "/" });
};
