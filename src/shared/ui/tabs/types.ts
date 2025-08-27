import type { Nullable } from "~/shared/types";

export interface UiTabsProps {
  modelValue: Nullable<string>;
  variant?: UiTabsVariant;
}

type UiTabsVariant = "primary" | "secondary";

export interface UiTabsEvents {
  (event: "update:modelValue", value: string): void;
}

export interface UiTabItemProps {
  label?: string;
  name: string;
  full?: boolean;
  unstyled?: boolean;
}

export interface ActiveTab {
  activeTab: Ref<Nullable<string>>;
  setActiveTab: (name: Nullable<string>) => void;
  variant: Ref<UiTabsVariant>;
}
