import { useTranslations } from "next-intl";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNotification } from "src/providers/NotificationProvider/NotificationProvider";
import { NotificationType } from "src/providers/NotificationProvider/types";
import { addHistoryItem } from "src/store/historySlice";
import { ResponseData as ResponseDataType } from "src/types";

interface UseFormActionReturnType {
  response: ResponseDataType | null;
  isLoading: boolean;
  handleSubmit: () => void;
}

const useFormAction = (): UseFormActionReturnType => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ResponseDataType | null>(null);
  const dispatch = useDispatch();
  const { showNotification } = useNotification();
  const errors = useTranslations("Errors");

  const handleSubmit = async (): Promise<void> => {
    try {
      setIsLoading(true);

      const { pathname, search } = window.location;
      const response = await fetch(`/api${pathname}${search}`, {
        cache: "no-store",
      });
      const data = await response.json();

      setResponse({ status: response.status, data });
      dispatch(
        addHistoryItem({ url: window.location.href, executed: Date.now() }),
      );
    } catch {
      showNotification(
        NotificationType.Error,
        "Error",
        errors("serverUnavailable"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { response, isLoading, handleSubmit };
};

export default useFormAction;
