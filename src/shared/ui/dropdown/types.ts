type DropdownTrigger = "click" | "contextmenu" | "hover";
type DropdownPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end"
  | "auto"
  | "auto-start"
  | "auto-end";

export interface UiDropdownItem {
  label: string;
  command?: string | number;
  disabled?: boolean;
  divided?: boolean;
}

export interface UiDropdownProps {
  trigger?: DropdownTrigger | DropdownTrigger[];
  placement?: DropdownPlacement;
  hideOnClick?: boolean;
  disabled?: boolean;
  teleported?: boolean;
  maxHeight?: number | string;
  items?: ReadonlyArray<UiDropdownItem>;
}

export type UiDropdownEmits<T = string | number> = {
  (e: "command", value: T): void;
  (e: "visible-change", value: boolean): void;
};
