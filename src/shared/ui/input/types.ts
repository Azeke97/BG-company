import type { InputProps as ElInputProps } from "element-plus";

export interface InputProps extends Partial<Omit<ElInputProps, "modelValue">> {
  modelValue?: string;
  id?: string;
  label?: string;
  name?: string;
  hint?: string;
  fullWidth?: boolean;
  showClear?: boolean;
}
