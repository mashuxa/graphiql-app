"use client";

import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import Notification from "src/components/Notification/Notification";
import {
  NotificationContextType,
  Notification as NotificationProps,
  NotificationType,
} from "src/providers/NotificationProvider/types";

export const TIMEOUT_MS = 5000;

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "NotificationContext Error: useNotification must be used within a NotificationProvider",
    );
  }

  return context;
};

export const NotificationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [data, setData] = useState<NotificationProps | null>(null);

  const showNotification = (
    type: NotificationType,
    title: string,
    description: string,
    autoClose = false,
  ): void => {
    setData({ type, title, description, autoClose });

    if (autoClose) {
      setTimeout(() => setData(null), TIMEOUT_MS);
    }
  };

  const handleClose = (): void => setData(null);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {data && <Notification {...data} onClose={handleClose} />}
    </NotificationContext.Provider>
  );
};
