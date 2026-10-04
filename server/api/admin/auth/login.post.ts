import { prisma } from "~~/server/utils/prisma";
import { asString } from "~~/server/utils/admin";
import { verifyPassword } from "~~/server/utils/password";
import { createSession } from "~~/server/utils/session";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string; password?: string }>(event);

  const email = asString(body.email, "email").toLowerCase();
  const password = asString(body.password, "password");

  const invalidCredentials = () =>
    createError({
      statusCode: 401,
      statusMessage: "Invalid credentials",
    });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.role !== "ADMIN" || user.isBlocked) {
    throw invalidCredentials();
  }

  if (!verifyPassword(password, user.passwordHash)) {
    throw invalidCredentials();
  }

  await createSession(user.id, event);

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
});
