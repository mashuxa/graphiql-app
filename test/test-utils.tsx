import { render, RenderResult } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import messageEn from "../src/messages/en.json";

const AllProviders = ({ children }: { children: ReactNode }): JSX.Element => {
  return (
    <NextIntlClientProvider locale="en" messages={messageEn}>
      {children}
    </NextIntlClientProvider>
  );
};

const customRender = (ui: React.ReactElement, options = {}): RenderResult =>
  render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
