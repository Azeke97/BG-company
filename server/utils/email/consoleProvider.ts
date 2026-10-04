import type { EmailProvider } from "~~/server/utils/email/types";

// Единственный рабочий провайдер отправки email в этом проекте: реальная
// отправка (SMTP/SendGrid/Resend и т.п.) не настроена, поэтому код
// подтверждения просто логируется на сервере — этого достаточно, чтобы
// пройти флоу авторизации покупателя локально/в деве.
export const consoleProvider: EmailProvider = {
  name: "CONSOLE",

  async sendVerificationCode({ email, code }) {
    console.log(`[EMAIL:DEV] Код подтверждения для ${email}: ${code}`);
  },
};
