import type { PaymentProvider } from "~~/server/utils/payment/types";
import { manualProvider } from "~~/server/utils/payment/manualProvider";

// Nitro автоимпортит всё из server/utils/** по имени файла — не реэкспортируем
// здесь `manualProvider`/`PaymentProvider`, чтобы не плодить конфликт имён
// с автоимпортом из manualProvider.ts/types.ts. Этот файл — только реестр.
const providers: Record<string, PaymentProvider> = {
  MANUAL: manualProvider,
};

export const getPaymentProvider = (
  name: string = "MANUAL",
): PaymentProvider => {
  const provider = providers[name];
  if (!provider) {
    throw new Error(`Unknown payment provider: ${name}`);
  }
  return provider;
};
