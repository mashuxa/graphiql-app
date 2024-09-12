import { LOCAL_STORAGE_HISTORY } from "src/constants";
import { HistoryItem } from "src/types";

export const encodeToBase64 = (str?: string): string => {
  return str ? btoa(str) : "";
};

export const decodeFromBase64 = (base64 = ""): string => {
  return base64 ? atob(decodeURIComponent(base64)) : "";
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

export const getHistory = (): HistoryItem[] => {
  const history = localStorage.getItem(LOCAL_STORAGE_HISTORY);

  if (history) {
    return JSON.parse(history);
  } else {
    return [];
  }
};

export const addHistoryItem = (item: HistoryItem): void => {
  const history: HistoryItem[] = getHistory();

  history.push(item);
  console.log(history);
  console.log(JSON.stringify(history));
  localStorage.setItem(LOCAL_STORAGE_HISTORY, JSON.stringify(history));
};
