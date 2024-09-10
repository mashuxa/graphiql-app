"use client";

import { FC, useEffect, useState } from "react";
import Button from "src/components/Button/Button";
import HeadersListItem from "src/components/HeadersList/HeadersListItem/HeadersListItem";
import { Header } from "src/components/HeadersList/types";
import {
  getUrlHeadersFromSearchParams,
  newItem,
  updateUrlHeaders,
} from "src/utils/headersUtils";

const HeadersList: FC = () => {
  const [headers, setHeaders] = useState<Header[]>([]);
  const addNewItem = (): void => setHeaders((prev) => [...prev, newItem()]);
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
    const defaultHeaders = getUrlHeadersFromSearchParams();

    if (defaultHeaders.length) {
      setHeaders(defaultHeaders);
    }
  }, []);

  useEffect(() => {
    updateUrlHeaders(headers);
  }, [headers]);

  return (
    <div className="flex">
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
      <Button type="button" onClick={addNewItem} className="bg-neutral-50">
        ➕
      </Button>
    </div>
  );
};

export default HeadersList;
