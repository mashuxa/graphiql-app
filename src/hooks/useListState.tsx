import { useState } from "react";

const useListState = <T extends { id: string }>(
  value: T[],
): [T[], (id: string, newValue: T) => void] => {
  const [items, setItems] = useState<T[]>(value);

  const generateNewItemID = (): string => {
    return items.length > 0
      ? `key-${parseInt(items[items.length - 1].id.replace("key-", ""), 10) + 1}`
      : "key-1";
  };

  const setListItems = (id: string, newValue: T): void => {
    const newItems = [...items];
    const i = items.findIndex((element) => element.id === id);

    if (i === -1) {
      newValue.id = generateNewItemID();
      newItems.push(newValue);
    } else {
      newItems[i] = newValue;

      console.log(newValue);

      console.log(newItems);
    }
    setItems(newItems);
  };

  return [items, setListItems] as const;
};

export default useListState;
