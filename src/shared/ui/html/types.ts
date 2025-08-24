import type { Config } from 'isomorphic-dompurify'

export interface SafeHtmlProps {
  content: string
  tag?: keyof HTMLElementTagNameMap
  sanitizeOptions?: Config
}

export type { Config as SafeHtmlSanitizeConfig }
