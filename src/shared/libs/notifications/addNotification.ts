import type {
  NotificationOptions,
  NotificationType,
} from "~/shared/libs/notifications/types";

export const addNotification = (
  message: string,
  type?: NotificationType,
  options?: NotificationOptions,
) => {
  return ElNotification({
    message,
    type,
    ...options,
  });
};
