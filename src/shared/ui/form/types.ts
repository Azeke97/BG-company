import type { FormRules, FormValidateCallback } from "element-plus";
import type { AnyRecord } from "~/shared/types";

export type UiFormRules<T extends AnyRecord> = FormRules<T>;

export interface UiFormProps<T extends AnyRecord> {
  model: T;
  rules?: UiFormRules<T>;
  labelPosition?: "left" | "right" | "top";
  hideRequiredAsterisk?: boolean;
}

export interface UiFormEvents {
  (event: "submit"): void;
}

export interface UiFormItemProps {
  prop?: string | string[];
  label?: string;
}

export interface UiFormInstance {
  validateForm: (callback?: FormValidateCallback) => Promise<boolean>;
  resetForm: () => void;
}
