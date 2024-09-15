import { parse } from "graphql";
import { format } from "graphql-formatter";
import beautify from "json-beautify";

export const isJsonValid = (data?: string): boolean => {
  if (!data) {
    return false;
  }

  try {
    JSON.parse(data);
  } catch {
    return false;
  }

  return true;
};

export const isGraphqlValid = (data?: string): boolean => {
  if (!data) {
    return false;
  }

  try {
    parse(data);
  } catch {
    return false;
  }

  return true;
};

export const beautifyJson = (data?: string): string => {
  // @ts-expect-error because of json-beautify incorrect types
  return beautify(JSON.parse(data), null, 2, 120);
};

export const beautifyGraphql = (data?: string): string => {
  return data ? format(data) : "";
};
