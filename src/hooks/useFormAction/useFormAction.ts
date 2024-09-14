import { useState } from "react";
import { useDispatch } from "react-redux";
import { addHistoryItem } from "src/store/historySlice";
import { ResponseData as ResponseDataType } from "src/types";

interface UseFormActionReturnType {
  response: ResponseDataType | null;
  isLoading: boolean;
  // handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleSubmit: () => void;
}

const useFormAction = (): UseFormActionReturnType => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ResponseDataType | null>(null);
  const dispatch = useDispatch();
  const handleSubmit = async () // event: FormEvent<HTMLFormElement>,
  : Promise<void> => {
    // event.preventDefault();

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
    } catch (e) {
      console.error(e);
      // @todo: add notification
      alert("Connection failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return { response, isLoading, handleSubmit };
};

export default useFormAction;
