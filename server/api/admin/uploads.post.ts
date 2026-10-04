import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const ALLOWED_MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event);
  const filePart = parts?.find((part) => part.name === "file");

  if (!filePart || !filePart.data) {
    throw createError({
      statusCode: 400,
      statusMessage: "File is required",
    });
  }

  const ext = filePart.type ? ALLOWED_MIME_TO_EXT[filePart.type] : undefined;
  if (!ext) {
    throw createError({
      statusCode: 400,
      statusMessage: "Unsupported file type",
    });
  }

  if (filePart.data.length > MAX_FILE_SIZE) {
    throw createError({
      statusCode: 400,
      statusMessage: "File too large",
    });
  }

  const uploadsDir = join(process.cwd(), "public", "uploads", "products");
  await mkdir(uploadsDir, { recursive: true });

  const filename = `${randomUUID()}.${ext}`;
  await writeFile(join(uploadsDir, filename), filePart.data);

  return { url: `/uploads/products/${filename}` };
});
