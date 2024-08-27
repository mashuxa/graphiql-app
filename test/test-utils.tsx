import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import { FC, ReactNode } from "react";
import AuthProvider from "src/providers/AuthProvider/AuthProvider";

interface AllProvidersProps {
  children: ReactNode;
  locale: string;
  messages: Record<string, Record<string, string>>;
}

const AllProviders: FC<AllProvidersProps> = ({
  children,
  locale,
  messages,
}) => {
  return (
    <MemoryRouterProvider>
      <AuthProvider>
        <html lang={locale}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <body>{children}</body>
          </NextIntlClientProvider>
        </html>
      </AuthProvider>
    </MemoryRouterProvider>
  );
};

const defaultMessages = {
  Greeting: {
    "auth-greeting": "Welcome Back, {username}!",
    "unauth-greeting": "Welcome!",
  },
};

const customRender = (
  ui: React.ReactElement,
  { locale = "en", messages = defaultMessages, ...options } = {},
) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <AllProviders locale={locale} messages={messages}>
        {children}
      </AllProviders>
    ),
    ...options,
  });
};

export * from "@testing-library/react";

export { customRender as render };
