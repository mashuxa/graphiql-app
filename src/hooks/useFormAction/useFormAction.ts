import { FormEvent, useState } from "react";
import { ResponseData as ResponseDataType } from "src/types";

interface UseFormActionReturnType {
  response: ResponseDataType | null;
  isLoading: boolean;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const useFormAction = (): UseFormActionReturnType => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ResponseDataType | null>(null);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const { pathname, search } = window.location;
      const response = await fetch(`/api${pathname}${search}`, {
        cache: "no-store",
      });
      const data = await response.json();

      setResponse({ status: response.status, data });
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
