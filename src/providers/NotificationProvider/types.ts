export enum NotificationType {
  Default = "default",
  Warning = "warning",
  Error = "error",
}
export interface Notification {
  type: NotificationType;
  title: string;
  description: string;
  autoClose?: boolean;
}

export type ShowNotificationType = (
  type: NotificationType,
  title: string,
  description: string,
  autoClose?: boolean,
) => void;

export interface NotificationContextType {
  showNotification: ShowNotificationType;
}
