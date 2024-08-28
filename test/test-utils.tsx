import { render, RenderResult } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

const messages = {
  LocaleSwitcher: {
    en: "English",
    ru: "Russian",
  },
  AuthButton: {
    signOut: "Sign Out",
    signIn: "Sign In",
  },
  Greeting: {
    "auth-greeting": "Welcome Back, {username}!",
    "unauth-greeting": "Welcome!",
    signIn: "Sign In",
    signUp: "Sign Up",
    restClient: "REST client",
    graphiqlClient: "GraphiQL client",
    history: "History",
  },
  GraphiQL: {
    placeholder: "GraphiQL client",
  },
  History: {
    placeholder: "History",
  },
  RestClient: {
    placeholder: "Rest client",
  },
  ResetPassword: {
    title: "Reset password",
    email: "Email",
    submit: "Reset",
    signIn: "Sign In",
  },
  SignIn: {
    title: "Sign In",
    email: "Email",
    password: "Password",
    submit: "Sign In",
    resetPassword: "Reset password",
    signUp: "Sign Up",
  },
  SignUp: {
    title: "Sign Up",
    name: "Name",
    email: "Email",
    password: "Password",
    repeatPassword: "Repeat password",
    submit: "Sign Up",
    signIn: "Sign In",
  },
  publicLayout: {
    signInWithGoogle: "Sign In with Google",
  },
};

const AllProviders = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};

const customRender = (ui: React.ReactElement, options = {}): RenderResult =>
  render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
