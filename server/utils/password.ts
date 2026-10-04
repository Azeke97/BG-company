// Nuxt-агностичный модуль: импортируется и из server/ (через ~~/server/utils/password),
// и напрямую из prisma/seed.mjs — без сборки, поэтому без top-level Nuxt-типов/авто-импортов.
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const KEY_LENGTH = 64;

export const hashPassword = (password: string): string => {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, KEY_LENGTH);
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
};

export const verifyPassword = (password: string, stored: string): boolean => {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;

  const salt = Buffer.from(saltHex, "hex");
  const hash = Buffer.from(hashHex, "hex");
  const candidate = scryptSync(password, salt, hash.length);

  if (candidate.length !== hash.length) return false;
  return timingSafeEqual(candidate, hash);
};
