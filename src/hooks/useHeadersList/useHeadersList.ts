import { useState } from "react";
import {
  Header,
  UseHeadersListReturnType,
} from "src/hooks/useHeadersList/types";

const newItem = (): Header => ({
  key: "",
  value: "",
  id: crypto.randomUUID(),
});

const useHeadersList = (): UseHeadersListReturnType => {
  const [headers, setHeaders] = useState(() => [newItem()]);

  const addNewItem = (): void => setHeaders((prev) => [...prev, newItem()]);
  const removeItem = (index: number): void =>
    setHeaders((prev) => prev.filter((_, i) => i !== index));
  const updateItem = (index: number, fieldName: string, value: string): void =>
    setHeaders((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [fieldName]: value } : item,
      ),
    );

  return { headers, addNewItem, removeItem, updateItem };
};

export default useHeadersList;
