import type { DialogProps } from "element-plus";

export type UiDialogProps = Partial<DialogProps>;

export type UiDialogEmits = {
  (e: "update:modelValue", value: boolean): void;
};
