import { createHash } from "node:crypto";
import { prisma } from "~~/server/utils/prisma";
import { getEmailProvider } from "~~/server/utils/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CODE_TTL_MS = 10 * 60 * 1000; // 10 минут
const RESEND_COOLDOWN_MS = 60 * 1000; // 60 секунд

const hashCode = (code: string) =>
  createHash("sha256").update(code).digest("hex");

const generateCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string }>(event);

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email || !EMAIL_RE.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Valid email is required",
    });
  }

  const lastCode = await prisma.emailVerificationCode.findFirst({
    where: { email },
    orderBy: { createdAt: "desc" },
  });

  if (
    lastCode &&
    !lastCode.consumedAt &&
    Date.now() - lastCode.createdAt.getTime() < RESEND_COOLDOWN_MS
  ) {
    throw createError({
      statusCode: 429,
      statusMessage: "Code already sent, try again later",
    });
  }

  const code = generateCode();
  await prisma.emailVerificationCode.create({
    data: {
      email,
      codeHash: hashCode(code),
      expiresAt: new Date(Date.now() + CODE_TTL_MS),
    },
  });

  await getEmailProvider().sendVerificationCode({
    email,
    code,
  });

  const response: { ok: true; devCode?: string } = { ok: true };

  // Только для локальной разработки: реальный email-провайдер не подключен,
  // поэтому код возвращаем прямо в ответе, чтобы флоу можно было
  // протестировать без почтового ящика. В продакшне это поле не должно
  // попадать в ответ ни при каких условиях.
  if (process.env.NODE_ENV !== "production") {
    response.devCode = code;
  }

  return response;
});
