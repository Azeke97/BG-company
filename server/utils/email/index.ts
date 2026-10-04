import type { EmailProvider } from "~~/server/utils/email/types";
import { consoleProvider } from "~~/server/utils/email/consoleProvider";

// Nitro автоимпортит всё из server/utils/** по имени файла — не реэкспортируем
// здесь `consoleProvider`/`EmailProvider`, чтобы не плодить конфликт имён
// с автоимпортом из consoleProvider.ts/types.ts. Этот файл — только реестр.
const providers: Record<string, EmailProvider> = {
  CONSOLE: consoleProvider,
};

export const getEmailProvider = (name: string = "CONSOLE"): EmailProvider => {
  const provider = providers[name];
  if (!provider) {
    throw new Error(`Unknown email provider: ${name}`);
  }
  return provider;
};
