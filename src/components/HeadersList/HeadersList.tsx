"use client";

import { FC, FormEvent, FormEventHandler, useEffect, useState } from "react";
import Button from "src/components/Button/Button";
import HeadersListItem from "src/components/HeadersList/HeadersListItem/HeadersListItem";
import { Header } from "src/components/HeadersList/types";
import { getSearchParams } from "src/utils/utils";

const newItem = (key = "", value = ""): Header => ({
  key,
  value,
  id: crypto.randomUUID(),
});

const HeadersList: FC = () => {
  const [headers, setHeaders] = useState<Header[]>([
    { id: "new", key: "", value: "" },
  ]);
  const addNewItem = (): void => setHeaders((prev) => [...prev, newItem()]);
  const onSubmit: FormEventHandler<HTMLFormElement> = (e: FormEvent): void => {
    addNewItem();
    e.preventDefault();
  };
  const onRemove = (index: number): void =>
    setHeaders((prev) => {
      return prev.filter((_, i) => i !== index);
    });
  const onChange = (index: number, fieldName: string, value: string): void =>
    setHeaders((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [fieldName]: value } : item,
      ),
    );

  useEffect(() => {
    const params = getSearchParams(headers);

    window.history.pushState(null, "", `${window.location.pathname}?${params}`);
  }, [headers]);

  return (
    <form className="flex" onSubmit={onSubmit}>
      <div className="flex-grow pr-6">
        {headers.map((header, index) => (
          <HeadersListItem
            key={header.id}
            index={index}
            header={header}
            onChange={onChange}
            onRemove={onRemove}
          />
        ))}
      </div>
      <Button type="submit" className="bg-neutral-50">
        ➕
      </Button>
    </form>
  );
};

export default HeadersList;
