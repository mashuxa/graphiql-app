"use client";

import { NextPage } from "next";
import Button from "src/components/Button/Button";
import HeadersListItem from "src/components/HeadersListItem/HeadersListItem";
import useHeadersList from "src/hooks/useHeadersList/useHeadersList";

const RestClient: NextPage = () => {
  const { headers, addNewItem, removeItem, updateItem } = useHeadersList();

  return (
    <div data-testid="rest-main">
      <div className="flex">
        <div className="pr-6">
          {headers.map((header, index) => (
            <HeadersListItem
              key={header.id}
              index={index}
              header={header}
              onRemove={removeItem}
              onChange={updateItem}
            />
          ))}
        </div>
        <Button onClick={addNewItem} className="bg-neutral-50">
          ➕
        </Button>
      </div>
    </div>
  );
};

export default RestClient;
