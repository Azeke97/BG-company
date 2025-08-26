export const appLocales = ["en", "ru", "kz"] as const;

export type AppLocales = (typeof appLocales)[number];

export const languages = [
  {
    code: "ru",
    label: "Рус",
  },
  {
    code: "en",
    label: "Eng",
  },
  {
    code: "kz",
    label: "Қаз",
  },
] as const satisfies ReadonlyArray<{ code: AppLocales; label: string }>;
