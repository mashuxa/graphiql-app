import beautify from "json-beautify";
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
      const response = await fetch(`/api${pathname}${search}`);

      let data: string;

      if (response.ok) {
        const responseJson = await response.json();

        // @ts-expect-error because of json-beautify incorrect types
        data = beautify(responseJson, null, 2, 120);
      } else {
        data = await response.text();
      }

      setResponse({ status: response.status, data });
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { response, isLoading, handleSubmit };
};

export default useFormAction;
