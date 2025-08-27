import type { Validator } from "./types";

export const booleanValidator: Validator = (rule, value, callback) => {
  return value ? callback() : callback(new Error());
};
