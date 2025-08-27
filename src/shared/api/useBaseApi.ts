import { makeFetchConfig } from "~/shared/api/config/makeFetchConfig";
import type { RequestConfig } from "~/shared/api/types";
import { useBaseConfig } from "~/shared/api/config/useBaseConfig";
import { globalCatchInterceptor } from "~/shared/api/globalCatchInterceptor";
import { globalThenInterceptor } from "~/shared/api/globalThenInterceptor";

export const useBaseApi = async <T>(
  url: string,
  config: RequestConfig = {},
) => {
  const baseConfig = useBaseConfig(config);
  const fetchConfig = makeFetchConfig(url, baseConfig);

  return $fetch<T>(url, fetchConfig)
    .then(globalThenInterceptor)
    .catch(globalCatchInterceptor);
};
