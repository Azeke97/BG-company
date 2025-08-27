export const useLoading = () => {
  const loading = ref(false);
  const withLoading = async <T extends Promise<any>>(callback: T) => {
    loading.value = true;

    const res = await callback;

    loading.value = false;

    return res;
  };

  return {
    loading,
    withLoading,
  };
};

export const useMultipleLoading = <Type extends string>(...keys: Type[]) => {
  const loading = reactive({}) as Record<Type, boolean>;

  keys.forEach((key) => {
    loading[key] = false;
  });

  const withLoading = async <T extends Promise<any>>(
    key: Type,
    callback: T,
  ) => {
    loading[key] = true;

    const res = await callback;

    loading[key] = false;

    return res;
  };

  return {
    loading,
    withLoading,
  };
};
