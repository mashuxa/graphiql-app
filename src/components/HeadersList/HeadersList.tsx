"use client";

import { FC, useEffect, useState } from "react";
import { methodsWithBody } from "src/app/api/[locale]/handleFetch";
import Button from "src/components/Button/Button";
import Details from "src/components/Details/Details";
import HeadersListItem from "src/components/HeadersList/HeadersListItem/HeadersListItem";
import { useAppSelector } from "src/store/hooks";
import { ContentType } from "src/types";
import {
  getUrlHeadersFromSearchParams,
  newItem,
  updateUrlHeaders,
} from "src/utils/headersUtils";
import { Header } from "./types";

const HeadersList: FC = () => {
  const [headers, setHeaders] = useState<Header[]>([]);
  const method = useAppSelector((state) => state.method.method);
  const contentType = useAppSelector((state) => state.contentType.contentType);

  const addNewItem = (): void => {
    setHeaders([...headers, newItem()]);
  };

  const onRemove = (index: number): void => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const onChange = (index: number, fieldName: string, value: string): void => {
    setHeaders(
      headers.map((item, i) =>
        i === index ? { ...item, [fieldName]: value } : item,
      ),
    );
  };

  useEffect(() => {
    const defaultHeaders = getUrlHeadersFromSearchParams();

    if (defaultHeaders.length) {
      setHeaders(defaultHeaders);
    }
  }, []);

  useEffect(() => {
    updateUrlHeaders(headers);
  }, [headers]);

  useEffect(() => {
    if (methodsWithBody.includes(method)) {
      setHeaders((prevHeaders) => {
        const contentTypeHeaderIndex = prevHeaders.findIndex(
          (header) => header.key === "Content-Type",
        );

        if (contentTypeHeaderIndex !== -1) {
          return prevHeaders.map((header, index) =>
            index === contentTypeHeaderIndex
              ? {
                  ...header,
                  value: ContentType[contentType as keyof typeof ContentType],
                }
              : header,
          );
        } else {
          return [
            ...prevHeaders,
            newItem(
              "Content-Type",
              ContentType[contentType as keyof typeof ContentType],
            ),
          ];
        }
      });
    } else {
      setHeaders((prevHeaders) =>
        prevHeaders.filter((header) => header.key !== "Content-Type"),
      );
    }
  }, [method, contentType]);

  return (
    <Details title="Headers">
      <div className="flex">
        <div className="flex-grow pr-6 space-y-2">
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
        <Button
          type="button"
          onClick={addNewItem}
          className="bg-neutral-50 text-secondary"
        >
          +
        </Button>
      </div>
    </Details>
  );
};

export default HeadersList;
