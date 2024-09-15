import { render, RenderResult } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { FC, PropsWithChildren, ReactElement } from "react";
import messageEn from "src/messages/en.json";
import { NotificationProvider } from "src/providers/NotificationProvider/NotificationProvider";

export const IntlProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <NextIntlClientProvider locale="en" messages={messageEn}>
      {children}
    </NextIntlClientProvider>
  );
};

const AllProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <IntlProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </IntlProvider>
  );
};

const customRender = (ui: ReactElement, options = {}): RenderResult =>
  render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
