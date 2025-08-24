export const appLocales = ['en', 'ru', 'kz'] as const

export type AppLocales = (typeof appLocales)[number]
