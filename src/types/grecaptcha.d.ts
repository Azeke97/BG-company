interface GrecaptchaRenderOptions {
  sitekey: string;
  theme?: "light" | "dark";
  size?: "normal" | "compact" | "invisible";
  hl?: string;
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
}

interface GrecaptchaApi {
  render(
    container: string | HTMLElement,
    options: GrecaptchaRenderOptions,
  ): number;
  reset(widgetId?: number): void;
}

declare global {
  interface Window {
    grecaptcha?: GrecaptchaApi;
  }
}

export {};
