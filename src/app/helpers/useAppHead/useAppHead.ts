export const useAppHead = () => {
  const title = computed(() => "BG-company");
  const meta = computed(() => [
    { charset: "utf-8" },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      hid: "description",
      name: "description",
      content: "",
    },
    {
      name: "format-detection",
      content: "telephone=no",
    },
    {
      name: "google",
      content: "notranslate",
    },
  ]);

  const link = computed(() => [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "icon",
      type: "image/svg+xml",
      href: "/favicon.png",
    },
  ]);

  const htmlAttrs = {
    lang: "ru",
    translate: "no" as const,
    class: "notranslate",
  };

  useHead({
    title,
    link,
    meta,
    htmlAttrs,
  });
};
