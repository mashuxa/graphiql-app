import { HttpMethod } from "src/types";

export type FetchOptions = {
  method: HttpMethod;
  headers: Record<string, string>;
  body?: string;
};

export const methodsWithBody = [
  HttpMethod.post,
  HttpMethod.put,
  HttpMethod.patch,
  HttpMethod.delete,
];
