import type { CollapseModelValue } from "element-plus";

export type UiCollapseProps = {
  modelValue?: CollapseModelValue;
};

export type UiCollapseItemProps = {
  name?: string | number;
};

export type UiCollapseEvents = {
  (e: "update:modelValue", val: CollapseModelValue): void;
};
