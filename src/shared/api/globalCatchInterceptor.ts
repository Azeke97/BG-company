import type { FetchError } from "ofetch";
import type { AnyCallback, Nullable } from "~/shared/types";

let unauthorizedHandler: Nullable<AnyCallback> = null;

export function setUnauthorizedHandler(cb: AnyCallback) {
  unauthorizedHandler = cb;
}

const checkIsNotAuthorizedError = (statusCode: number) => {
  const isNotAuthorizedError = statusCode === 401;

  if (isNotAuthorizedError && unauthorizedHandler) {
    unauthorizedHandler();
  }
};

const getStatusCode = (error: FetchError<any>) => {
  return error?.statusCode || error?.response?.status || 0;
};

export const globalCatchInterceptor = (error: FetchError) => {
  const statusCode = getStatusCode(error);
  checkIsNotAuthorizedError(statusCode);

  throw error;
};
