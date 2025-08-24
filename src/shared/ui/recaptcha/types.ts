export interface UiRecaptchaProps {
  captchaValid: boolean
  captchaResponse: string
  theme?: 'light' | 'dark'
}

export interface UiRecaptchaEvents {
  (eventName: 'update:captchaValid', newValue: boolean): void
  (eventName: 'update:captchaResponse', newValue: string): void
}
