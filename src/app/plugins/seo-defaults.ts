// src/app/plugins/seo-defaults.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("page:finish", () => {
    const appConfig = useAppConfig();
    const route = useRoute();
    const { locales } = useI18n();

    const siteName: string = appConfig.siteName ?? "BG Company";
    const siteUrl: string = appConfig.siteUrl ?? "https://bg-company.kz";

    const normalize = (u: string) => u.replace(/\/$/, "");
    const url = normalize(siteUrl) + route.fullPath;

    useSeoMeta({
      title: siteName,
      ogTitle: siteName,
      description:
        "Ремонт квартир и домов, натяжные потолки, изготовление мебели.",
      ogDescription:
        "Ремонт квартир и домов, натяжные потолки, изготовление мебели.",
      ogType: "website",
      ogUrl: url,
      ogSiteName: siteName,
      twitterCard: "summary_large_image",
    });

    const strategyUrl = (code: string) => {
      const isDefault = code === "ru";
      const prefix = isDefault ? "" : `/${code}`;
      return normalize(siteUrl) + prefix + route.fullPath;
    };

    const linkTags: Array<Record<string, string>> = [
      {
        rel: "canonical",
        href: url,
      },
      ...(locales.value as Array<{ code: string }>).map((l) => ({
        rel: "alternate",
        hreflang: l.code,
        href: strategyUrl(l.code),
      })),
      {
        rel: "alternate",
        hreflang: "x-default",
        href: strategyUrl("ru"),
      },
    ];

    useHead({ link: linkTags });
  });
});
