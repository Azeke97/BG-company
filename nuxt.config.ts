// https://nuxt.com/docs/api/configuration/nuxt-config
import viteImagemin from "vite-plugin-imagemin";
export default defineNuxtConfig({
  compatibilityDate: "2025-08-22",
  devtools: { enabled: true },
  ssr: true,
  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_PUBLIC_BASE_URL || "/",
      recaptcha: process.env.NUXT_PUBLIC_RECAPTCHA || "",
      YANDEX_MAPS_API_KEY: process.env.NUXT_PUBLIC_YANDEX_MAPS_API_KEY || "",
    },
  },
  modules: [
    "@pinia/nuxt",
    "@nuxt/icon",
    "@nuxtjs/i18n",
    "@nuxt/eslint",
    "dayjs-nuxt",
    "@nuxtjs/robots",
    "@vueuse/nuxt",
    "@element-plus/nuxt",
    "nuxt-svgo",
    "@nuxtjs/sitemap",
  ],

  srcDir: "src/",
  css: ["~/app/styles/index.css", "~/app/styles/fonts.css"],
  dir: {
    plugins: "app/plugins",
    middleware: "app/middleware",
    layouts: "app/layouts",
    pages: "pages",
  },

  i18n: {
    // @ts-expect-error nuxt-i18n types не знают про seo
    seo: true,
    baseUrl: "https://bg-company.kz",
    strategy: "prefix_except_default",
    defaultLocale: "ru",
    restructureDir: "./src/app",
    langDir: "lang/dictionary",
    locales: [
      {
        code: "ru",
        iso: "ru-KZ",
        file: "ru.ts",
        name: "Русский",
      },
      {
        code: "en",
        iso: "en-US",
        file: "en.ts",
        name: "English",
      },
      {
        code: "kz",
        iso: "kk-KZ",
        file: "kz.ts",
        name: "Қазақша",
      },
    ],
  },

  dayjs: {
    locales: ["ru"],
    plugins: ["relativeTime", "utc", "timezone"],
    defaultLocale: "ru",
    defaultTimezone: "Asia/Almaty",
  },

  eslint: {
    checker: true,
  },

  elementPlus: {
    importStyle: "css",
  },

  vite: {
    plugins: [
      viteImagemin({
        gifsicle: { optimizationLevel: 3 },
        mozjpeg: { quality: 72 },
        optipng: { optimizationLevel: 5 },
        pngquant: { quality: [0.65, 0.8] },
        svgo: {
          plugins: [
            {
              name: "removeViewBox",
              active: false,
            },
          ],
        },
      }),
    ],
  },

  sitemap: {
    // @ts-expect-error: nuxt-simple-sitemap types glitch with verbatimModuleSyntax
    siteUrl: "https://bg-company.kz",
    autoI18n: true,
    urls: [
      "/",
      "/shop",
      "/services",
      "/services/renovation",
      "/services/ceilings",
      "/services/carpentry",
    ],

    defaults: {
      changefreq: "weekly",
      priority: 0.7,
    },
    exclude: ["/admin/**"],
  },

  robots:
    process.env.NODE_ENV === "production"
      ? {
          groups: [
            {
              userAgent: "*",
              allow: "/",
            },
          ],
          sitemap: ["https://bg-company.kz/sitemap.xml"],
        }
      : {
          groups: [
            {
              userAgent: "*",
              disallow: "/",
            },
          ],
        },
});
