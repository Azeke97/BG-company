import type { NuxtLinkProps } from "#app";
import type { RouteLocationNamedRaw } from "#vue-router";

export interface UiLinkDirection {
  to: string | RouteLocationNamedRaw;
  forceTo?: boolean;
}

export interface UiLinkProps extends UiLinkDirection {
  label?: string;
  linkProps?: NuxtLinkProps;
  variant?: "primary" | "secondary" | "tertiary";
}
