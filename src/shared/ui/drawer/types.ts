import type { DrawerProps } from "element-plus";

export type UiDrawerProps = Partial<DrawerProps>;

export type UiDrawerEmits = {
  (e: "update:modelValue", value: boolean): void;
};
