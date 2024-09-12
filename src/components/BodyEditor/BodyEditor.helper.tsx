import { parse } from "graphql";
import beautify from "json-beautify";
import { format } from "prettier";
import plugin from "prettier/plugins/graphql";

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
  // if (isJsonValid(data)) {
  // todo: fix null type error
  // @ts-expect-error because of json-beautify incorrect types

  return beautify(JSON.parse(data), null, 2, 120);
};

export const beautifyGraphql = async (data?: string): Promise<string> => {
  return await format(data || "", { parser: "graphql", plugins: [plugin] });
};
