import { createError } from "h3";

export const toSlug = (value: string) => {
  const slug = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9а-яё\s-]/gi, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || `item-${Date.now()}`;
};

export const asString = (value: unknown, field: string): string => {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: `${field} is required`,
    });
  }
  return value.trim();
};

export const asOptionalString = (value: unknown): string | undefined => {
  if (typeof value !== "string") return undefined;
  const v = value.trim();
  return v.length > 0 ? v : undefined;
};

export const asOptionalNullableString = (
  value: unknown,
): string | null | undefined => {
  if (value === null) return null;
  if (typeof value !== "string") return undefined;
  const v = value.trim();
  return v.length > 0 ? v : null;
};

export const asOptionalInt = (
  value: unknown,
  field: string,
): number | undefined => {
  if (value === undefined || value === null || value === "") return undefined;
  const n = Number(value);
  if (!Number.isFinite(n) || !Number.isInteger(n)) {
    throw createError({
      statusCode: 400,
      statusMessage: `${field} must be integer`,
    });
  }
  return n;
};

export const asOptionalBool = (value: unknown): boolean | undefined => {
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
};

export const asOptionalDate = (
  value: unknown,
  field: string,
): Date | null | undefined => {
  if (value === undefined) return undefined;
  if (value === null || value === "") return null;
  if (typeof value !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: `${field} must be valid date string`,
    });
  }

  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) {
    throw createError({
      statusCode: 400,
      statusMessage: `${field} must be valid date string`,
    });
  }
  return dt;
};

export const asOptionalStringArray = (value: unknown): string[] | undefined => {
  if (value === undefined || value === null) return undefined;
  if (!Array.isArray(value)) {
    throw createError({
      statusCode: 400,
      statusMessage: "productIds must be array",
    });
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
};
