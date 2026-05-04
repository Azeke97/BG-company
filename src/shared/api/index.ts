export { useBaseApi } from "./useBaseApi";

export { isErrorResponse } from "./helpers/isErrorResponse";

export { setUnauthorizedHandler } from "./globalCatchInterceptor";
export { adminApi } from "./admin";

export type {
  ServerResponseStatus,
  ServerSuccessResponse,
  ServerErrorResponse,
} from "./types";
