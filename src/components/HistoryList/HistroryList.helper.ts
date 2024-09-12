export const addNotFetchQueryParam = (url: string): string => {
  const urlObj = new URL(url);

  urlObj.searchParams.append("fetch", "false");

  return urlObj.href;
};

export const isFetchData = (searchParams: Record<string, string>): boolean => {
  return !(searchParams["fetch"] === "false");
};
