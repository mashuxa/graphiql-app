"use client";
import { FC } from "react";
import HeadersList from "src/components/HeadersList/HeadersList";
import useListState from "src/hooks/useListState";
import { Header } from "src/types";

const GraphiQLClient: FC = () => {
  const [items, setListItems] = useListState<Header>([]);
  const updateListItems = (id: string, newItem: Header): void => {
    setListItems(id, newItem);
  };

  return (
    <>
      {/*<URLsEditorPanel />*/}
      <HeadersList data={items} updateData={updateListItems} />
    </>
  );
};

export default GraphiQLClient;
