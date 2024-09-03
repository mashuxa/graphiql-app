import { Header } from "src/components/HeadersList/types";
import { routes } from "src/constants";
import { getSearchParams } from "src/utils/utils";

export enum ArgType {
  method,
  url,
  body,
}

export const newItem = (key = "", value = ""): Header => ({
  key,
  value,
  id: crypto.randomUUID(),
});

export const updateUrlHeaders = (headers: Header[]): void => {
  const params = getSearchParams(headers);

  window.history.pushState(null, "", `${window.location.pathname}?${params}`);
};

export const getUrlParams = (): URLSearchParams => {
  const url = new URL(window.location.href);

  return new URLSearchParams(url.search);
};

export const getUrlHeaders = (): Header[] => {
  const searchParams = getUrlParams();

  return Array.from(searchParams.entries()).map(([key, value]) =>
    newItem(key, value),
  );
};

interface UrlData {
  method: string;
  url: string;
  body: string;
}

export const getUrlData = (): UrlData => {
  const [, , method, url, body] = window.location.pathname.split("/");

  return { method, url, body };
};

export const replaceUrlData = (type: ArgType, value: string): void => {
  let { method, url, body } = getUrlData();
  const searchParams = getUrlParams().toString();

  switch (type) {
    case ArgType.method:
      method = value;

      break;
    case ArgType.url:
      url = value;

      break;
    case ArgType.body:
      body = value;

      break;
  }

  const newUrl = `${[routes.restClient, method, url, body].join("/")}?${searchParams}`;

  window.history.pushState(null, "", newUrl);
};
