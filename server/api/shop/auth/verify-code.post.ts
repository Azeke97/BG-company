import { createHash } from "node:crypto";
import { prisma } from "~~/server/utils/prisma";
import { createShopSession } from "~~/server/utils/shopSession";

const MAX_ATTEMPTS = 5;

const hashCode = (code: string) =>
  createHash("sha256").update(code).digest("hex");

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string; code?: string }>(event);

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const code = typeof body.code === "string" ? body.code.trim() : "";

  if (!email || !code) {
    throw createError({
      statusCode: 400,
      statusMessage: "email and code are required",
    });
  }

  const record = await prisma.emailVerificationCode.findFirst({
    where: {
      email,
      consumedAt: null,
    },
    orderBy: { createdAt: "desc" },
  });

  if (!record || record.expiresAt.getTime() < Date.now()) {
    throw createError({
      statusCode: 400,
      statusMessage: "Code expired or not found",
    });
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    throw createError({
      statusCode: 400,
      statusMessage: "Too many attempts, request a new code",
    });
  }

  if (hashCode(code) !== record.codeHash) {
    await prisma.emailVerificationCode.update({
      where: { id: record.id },
      data: { attempts: { increment: 1 } },
    });
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid code",
    });
  }

  const user = await prisma.$transaction(async (tx) => {
    await tx.emailVerificationCode.update({
      where: { id: record.id },
      data: { consumedAt: new Date() },
    });

    const upsertedUser = await tx.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        role: "USER",
        passwordHash: null,
      },
    });

    return upsertedUser;
  });

  await createShopSession(user.id, event);

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
    },
  };
});
