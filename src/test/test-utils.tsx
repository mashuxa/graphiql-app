import { render, RenderResult } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { PropsWithChildren } from "react";
import { Locale } from "src/i18n.config";
import messageEn from "src/messages/en.json";
import { NotificationProvider } from "src/providers/NotificationProvider/NotificationProvider";

const AllProviders = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <NextIntlClientProvider locale={Locale.EN} messages={messageEn}>
      <NotificationProvider>{children}</NotificationProvider>
    </NextIntlClientProvider>
  );
};

const customRender = (ui: React.ReactElement, options = {}): RenderResult =>
  render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
