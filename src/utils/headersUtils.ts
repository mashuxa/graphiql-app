import { Header } from "src/components/HeadersList/types";
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

export const getUrlSearchParams = (): URLSearchParams => {
  return new URLSearchParams(window.location.search);
};

export const getUrlHeadersFromSearchParams = (): Header[] => {
  const searchParams = getUrlSearchParams();

  return Array.from(searchParams.entries()).map(([key, value]) =>
    newItem(key, value),
  );
};

export const updateUrlHeaders = (headers: Header[]): void => {
  const params = makeSearchParams(headers);

  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}${params ? `?${params}` : ""}`,
  );
};

interface UrlData {
  locale: string;
  method: string;
  url: string;
  body: string;
}

export const getUrlData = (): UrlData => {
  const [, locale, method, urlBase64, bodyBase64] =
    window.location.pathname.split("/");

  return {
    locale: locale || "en",
    method: method || "GRAPHQL",
    url: decodeFromBase64(urlBase64),
    body: decodeFromBase64(bodyBase64),
  };
};

export const replaceBodyVariables = (
  body: string,
  variables: Header[],
): string => {
  return variables.reduce(
    (acc, { key, value }) => acc.replaceAll(`{{${key}}}`, value),
    body,
  );
};

export const replaceUrlData = (
  type: ArgType,
  value: string,
  variables?: Header[],
): void => {
  // eslint-disable-next-line prefer-const
  let { locale, method, url, body } = getUrlData();
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

  if (Array.isArray(variables) && variables.length) {
    body = replaceBodyVariables(body, variables);
  }

  const newUrl = `/${[locale, method, encodeToBase64(url), encodeToBase64(body)].join("/")}?${searchParams}`;

  window.history.replaceState(null, "", newUrl);
};
