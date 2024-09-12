import { HttpMethod } from "src/types";

export type FetchOptions = {
  method: HttpMethod;
  headers: Record<string, string>;
  body?: string;
};
