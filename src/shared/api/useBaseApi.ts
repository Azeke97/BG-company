import { makeFetchConfig } from "~/shared/api/config/makeFetchConfig";
import type { RequestConfig } from "~/shared/api/types";
import type { FetchOptions } from "ofetch";
import { useBaseConfig } from "~/shared/api/config/useBaseConfig";
import { globalCatchInterceptor } from "~/shared/api/globalCatchInterceptor";
import { globalThenInterceptor } from "~/shared/api/globalThenInterceptor";

type PlainFetch = <R>(request: string, options?: FetchOptions) => Promise<R>;

export const useBaseApi = async <T>(
  url: string,
  config: RequestConfig = {},
) => {
  const baseConfig = useBaseConfig(config);
  const fetchConfig = makeFetchConfig(url, baseConfig);
  const plainFetch = $fetch as unknown as PlainFetch;

  return plainFetch<T>(url, fetchConfig)
    .then(globalThenInterceptor)
    .catch(globalCatchInterceptor);
};
