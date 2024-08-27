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

export type ChangeEventHandler<T> = (event: React.ChangeEvent<T>) => void;

export interface Header {
  key: string;
  value: string;
  id: string;
}
