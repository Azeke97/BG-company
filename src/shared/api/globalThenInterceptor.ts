import { isObject } from "lodash-es";
import type { ServerSuccessResponse } from "~/shared/api/types";

export const globalThenInterceptor = <T>(res: T) => {
  if (isObject(res) && "suceess" in res) {
    // @ts-expect-error field name error on backend side
    res.success = res.suceess as ServerSuccessResponse["success"];
  }

  return res;
};
