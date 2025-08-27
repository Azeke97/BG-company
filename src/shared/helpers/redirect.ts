import type { AnyRecord } from "~/shared/types";

interface RedirectOptions {
  query?: AnyRecord;
  external?: boolean;
}

export const redirect = (path: string, options?: RedirectOptions) => {
  const localePath = useLocalePath();

  return navigateTo({
    ...options,
    path: options?.external ? path : localePath(path),
  });
};
