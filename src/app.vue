<script setup lang="ts">
import { useAppHead } from "~/app/helpers/useAppHead";
import { useDayjsLocale, useElementLocale } from "~/app/helpers/locales";

const { locale } = useI18n();

const elementLocale = useElementLocale(locale.value);
useDayjsLocale(locale.value);
useAppHead();

const appConfig = useAppConfig();
const route = useRoute();

const siteName = appConfig.siteName ?? "BG Company";
const siteUrl = (appConfig.siteUrl ?? "https://bg-company.kz").replace(
  /\/$/,
  "",
);

const canonical = computed(() => siteUrl + route.path);

const i18nHead = useLocaleHead({
  seo: true,
  dir: true,
  lang: true,
});

useSeoMeta({
  title: siteName,
  ogTitle: siteName,
  description: "Ремонт квартир и домов, натяжные потолки, изготовление мебели.",
  ogDescription:
    "Ремонт квартир и домов, натяжные потолки, изготовление мебели.",
  ogType: "website",
  ogSiteName: siteName,
  ogUrl: () => canonical.value,
  twitterCard: "summary_large_image",
});

useHead(() => ({
  key: "seo-defaults",
  titleTemplate: (t?: string) => (t ? `${t} — ${siteName}` : siteName),
  link: [
    {
      rel: "canonical",
      href: canonical.value,
    },
    ...(i18nHead.value.link || []),
  ],
  htmlAttrs: i18nHead.value.htmlAttrs,
  meta: i18nHead.value.meta,
}));
</script>

<template>
  <ElConfigProvider :locale="elementLocale">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </ElConfigProvider>
</template>
