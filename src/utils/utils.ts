export const encodeToBase64 = (str?: string): string => {
  return str ? btoa(str) : "";
};

export const decodeFromBase64 = (base64 = ""): string => {
  return base64 ? atob(decodeURIComponent(base64)) : "";
};
