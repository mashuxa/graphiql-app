import { Header } from "src/components/HeadersList/types";
import { routes } from "src/constants";
import { decodeFromBase64, encodeToBase64 } from "src/utils/utils";

export enum ArgType {
  method,
  url,
  body,
}

export interface SearchParam {
  key: string;
  value: string;
}

export const makeSearchParams = (params: SearchParam[]): string => {
  const searchParams = new URLSearchParams();

  params.forEach(({ key, value }) => searchParams.set(key, value));

  return searchParams.toString();
};

export const newItem = (key = "", value = ""): Header => ({
  key,
  value,
  id: crypto.randomUUID(),
});

export const updateUrlHeaders = (headers: Header[]): void => {
  const params = makeSearchParams(headers);

  const newUrl = params
    ? `${window.location.pathname}?${params}`
    : window.location.pathname;

  window.history.replaceState(null, "", newUrl);
};

export const getUrlParams = (): URLSearchParams => {
  return new URLSearchParams(window.location.search);
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

  return { method, url: decodeFromBase64(url), body: decodeFromBase64(body) };
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

  const newUrl = `${[routes.restClient, method, encodeToBase64(url), encodeToBase64(body)].join("/")}?${searchParams}`;

  window.history.replaceState(null, "", newUrl);
};
