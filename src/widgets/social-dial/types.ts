export type ItemId = "telegram" | "whatsapp" | "instagram" | "phone";
export interface SocialItem {
  id: ItemId;
  href: string;
  label?: string;
  offset?: { x: number; y: number };
}
