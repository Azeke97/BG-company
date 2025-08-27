import type { InputProps as ElInputProps } from "element-plus";

export interface TextareaProps extends Partial<ElInputProps> {
  modelValue: string;
  label?: string;
  hint?: string;
  error?: boolean | string;
  id?: string;
  fullWidth?: boolean;
  rows?: number;
  autosize?: boolean | { minRows?: number; maxRows?: number };
}
