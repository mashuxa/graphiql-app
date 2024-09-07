import { defaultContentType } from "src/components/BodyEditor/BodyEditor";
import { Header } from "src/components/HeadersList/types";
import { decodeFromBase64, encodeToBase64 } from "src/utils/utils";

export const contentTypeHeaderKey = "Content-Type";

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
  const currentSearchParams = new URLSearchParams(window.location.search);
  const contentTypeValue =
    currentSearchParams.get(contentTypeHeaderKey) || defaultContentType;

  params.forEach(({ key, value }) => searchParams.set(key, value));
  searchParams.set(contentTypeHeaderKey, contentTypeValue);

  return searchParams.toString();
};

export const newItem = (key = "", value = ""): Header => ({
  key,
  value,
  id: crypto.randomUUID(),
});

export const getUrlSearchParams = (): URLSearchParams => {
  return new URLSearchParams(window.location.search);
};

export const getUrlHeadersFromSearchParams = (): Header[] => {
  const searchParams = getUrlSearchParams();
  const searchParamsArr = Array.from(searchParams.entries());

  return searchParamsArr.reduce<Header[]>((acc, [key, value]) => {
    const isContentTypeHeader = key === "Content-Type";

    return isContentTypeHeader ? acc : [...acc, newItem(key, value)];
  }, []);
};

export const updateUrlHeaders = (headers: Header[]): void => {
  const params = makeSearchParams(headers);
  const newUrl = `${window.location.pathname}${params ? `?${params}` : ""}`;

  window.history.replaceState(null, "", newUrl);
};

interface UrlData {
  method: string;
  url: string;
  body: string;
}

export const getUrlData = (): UrlData => {
  const [, method, urlBase64, bodyBase64] = window.location.pathname.split("/");

  return {
    method,
    url: decodeFromBase64(urlBase64),
    body: decodeFromBase64(bodyBase64),
  };
};

export const replaceUrlData = (type: ArgType, value: string): void => {
  let { method, url, body } = getUrlData();
  const searchParams = getUrlSearchParams().toString();

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

  const newUrl = `/${[method, encodeToBase64(url), encodeToBase64(body)].join("/")}?${searchParams}`;

  window.history.replaceState(null, "", newUrl);
};
