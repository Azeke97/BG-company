export interface UiMarkerPopupProps {
  title?: string;
  content?: string | (() => string);
  placement?: "top" | "bottom" | "left" | "right";
  width?: number | string;
  iconSize?: number | string;
}

export type UiMarkerPopupEvents = {
  (e: "show" | "hide"): void;
};
