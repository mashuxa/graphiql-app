import { HistoryItem } from "src/types";

export const encodeToBase64 = (str?: string): string => {
  return str ? btoa(str) : "";
};

export const decodeFromBase64 = (base64 = ""): string => {
  return base64 ? atob(decodeURIComponent(base64)) : "";
};

export const getHistoryFromLocalStorage = (): HistoryItem[] => {
  const history = localStorage.getItem("History");

  if (history) {
    return JSON.parse(history);
  } else {
    return [];
  }
};

export const addHistoryItemToLocalStorage = (item: HistoryItem): void => {
  const history: HistoryItem[] = getHistoryFromLocalStorage();

  history.push(item);
  localStorage.setItem("History", JSON.stringify(history));
};

export const decodeUrl = (url: string): string => {
  const FIRST_ENCODED_URI_SEGMENT_INDEX = 3;

  const urlObj = new URL(url);

  const pathnameSegments = urlObj.pathname
    ?.split("/")
    .map((element, index) =>
      index < FIRST_ENCODED_URI_SEGMENT_INDEX
        ? element
        : decodeFromBase64(element),
    )
    .join("/");

  return `${urlObj.protocol}/${pathnameSegments}${urlObj.searchParams}`;
};
