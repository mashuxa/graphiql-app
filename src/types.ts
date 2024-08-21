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
