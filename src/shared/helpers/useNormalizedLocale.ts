export const useNormalizedLocale = () => {
  const { locale } = useI18n();
  const normalizedLocale = computed(() =>
    locale.value === "kz" ? "kk" : locale.value,
  );
  return normalizedLocale;
};
