import type { UiButtonProps } from "~/shared/ui/button";

export interface UiSignEDSProps<T extends XMLDocument | string>
  extends Omit<UiButtonProps, "to" | "forceTo"> {
  text: string;
  errorText: string;
  content: T;
  singType: "cms" | "xml";
}

export interface UiSignEDSEvents<T extends XMLDocument | string> {
  (event: "sign", data: T): void;
}
