// src/types/nuxt-schema.d.ts
declare module "nuxt/schema" {
  interface AppConfigInput {
    siteName?: string;
    siteUrl?: string;
  }
  interface AppConfig {
    siteName?: string;
    siteUrl?: string;
  }
}
export {};
