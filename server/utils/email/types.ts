// Провайдер-агностичный контракт отправки писем.
//
// ВАЖНО: в этом проекте реальная отправка email (SMTP/SendGrid/Resend и т.п.)
// пока НЕ настроена и НЕ реализуется. Единственный рабочий провайдер —
// консольная заглушка (см. `consoleProvider.ts`), которая просто логирует
// код подтверждения на сервере. Интерфейс оставлен провайдер-агностичным,
// чтобы позже подключить реальный провайдер без изменения вызывающего кода
// (по аналогии с `server/utils/payment/types.ts`).
export interface EmailProvider {
  name: string;
  sendVerificationCode(params: { email: string; code: string }): Promise<void>;
}
