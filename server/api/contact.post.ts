// /server/api/contact.post.ts
export default defineEventHandler(async (event) => {
  const body = await readBody<{
    name?: string;
    phone?: string;
    email?: string;
    message?: string;
    page?: string;
  }>(event);

  if (!body?.name || !body?.email) {
    throw createError({
      statusCode: 400,
      statusMessage: "name and email are required",
    });
  }

  const { google } = await import("googleapis");

  const auth = new (await import("google-auth-library")).JWT({
    email: process.env.GOOGLE_SA_EMAIL!,
    key: process.env.GOOGLE_SA_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({
    version: "v4",
    auth,
  });

  const spreadsheetId = process.env.GOOGLE_SHEET_ID!;
  const sheet = process.env.GOOGLE_SHEET_TAB || "Лист1";

  const rawPhone = (body.phone || "").trim();
  const phoneDigits = rawPhone.replace(/[^\d]/g, ""); // нормализуем с "+7 (707) 777-77-77" в "77077777777" чтоб не ругался ексель

  const values = [
    [
      body.name || "",
      phoneDigits,
      body.email || "",
      body.message || "",
      body.page || "",
    ],
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheet}!A:E`,
    valueInputOption: "RAW",
    requestBody: { values },
  });

  return { ok: true };
});
