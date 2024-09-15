import { FC, useMemo } from "react";
import {
  Notification,
  NotificationType,
} from "src/providers/NotificationProvider/types";

interface NotificationProps extends Notification {
  onClose: () => void;
}

const NotificationModal: FC<NotificationProps> = ({
  type,
  title,
  description,
  onClose,
}) => {
  const bgColor = useMemo(() => {
    switch (type) {
      case NotificationType.Warning:
        return "bg-warning";

      case NotificationType.Error:
        return "bg-error";

      default:
        return "bg-secondary";
    }
  }, [type]);

  return (
    <div
      data-testid="notification"
      className={`${bgColor} fixed top-40 right-0 mr-2 transform translate-x-full
      animate-slide-in p-4 pt-6 min-w-60 rounded-md shadow-md text-white
      transition-transform duration-500`}
    >
      <h2 className="flex-grow text-xl font-bold">{title}</h2>
      <div className="flex-grow">{description}</div>
      <button
        data-testid="notification-close"
        onClick={onClose}
        className="absolute top-0 right-0 p-2 text-white hover:text-gray-200"
      >
        ✖
      </button>
    </div>
  );
};

export default NotificationModal;
