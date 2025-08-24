import type { NotificationOptions as NotificationProps } from 'element-plus'

export type NotificationType = 'primary' | 'success' | 'warning' | 'error' | 'info'

export interface NotificationOptions extends Omit<NotificationProps, 'message' | 'type'> {}
