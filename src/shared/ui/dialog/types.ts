import type { ExtractPropTypes } from "vue";
import type { dialogProps } from "element-plus";

export type UiDialogProps = Partial<ExtractPropTypes<typeof dialogProps>>;

export type UiDialogEmits = {
  (e: "update:modelValue", value: boolean): void;
};
