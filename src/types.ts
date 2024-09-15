export enum AuthProvider {
  google = "google",
  local = "local",
}
export interface User {
  uid: string;
  name: string;
  email: string;
  authProvider: AuthProvider;
}

export enum HttpMethod {
  get = "GET",
  post = "POST",
  put = "PUT",
  delete = "DELETE",
  patch = "PATCH",
  options = "OPTIONS",
  head = "HEAD",
  connect = "CONNECT",
  trace = "TRACE",
}

export const httpMethodList = Object.values(HttpMethod);

export interface RequestData {
  sdlUrl: string;
}

export interface ResponseData {
  status: number;
  data: string;
}

export type FetchOptions = {
  method: HttpMethod;
  headers: Record<string, string>;
  body?: string;
};

export enum ContentType {
  json = "application/json",
  text = "text/plain",
}

export interface HistoryItem {
  url: string;
  executed: number;
}
