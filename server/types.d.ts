import type { SessionUser } from "~~/server/utils/session";

declare module "h3" {
  interface H3EventContext {
    admin?: SessionUser;
  }
}

export {};
