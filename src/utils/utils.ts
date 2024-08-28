export interface SearchParam {
  key: string;
  value: string;
}

export const encodeToBase64 = (str?: string): string => {
  return str ? btoa(str) : "";
};

export const decodeFromBase64 = (base64 = ""): string => {
  return base64 ? atob(decodeURIComponent(base64)) : "";
};

export const getSearchParams = (newData: SearchParam[]): string => {
  const searchParams = new URLSearchParams();

  newData.forEach(({ key, value }) => searchParams.set(key, value));

  return searchParams.toString();
};
