import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { Metadata } from "next";
import { Inter } from "next/font/google";
import { FC, ReactNode } from "react";
import Footer from "src/components/Footer/Footer";
import Header from "src/components/Header/Header";
// import { GlobalStateProvider } from "src/context/GlobalStateContext";
import AuthProvider from "src/providers/AuthProvider/AuthProvider";
import StoreProvider from "src/store/StoreProvider";
import "./globals.css";

interface RootLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Getman",
  description: "Light-weight platform for using apis",
};

const RootLayout: FC<Readonly<RootLayoutProps>> = async ({
  children,
  params: { locale },
}) => {
  const messages = await getMessages();

  return (
    <AuthProvider>
      {/* <GlobalStateProvider> */}
      {/* <Provider store={store}> */}
      <StoreProvider>
        <html lang={locale}>
          <NextIntlClientProvider messages={messages}>
            <body className={`${inter.className} flex flex-col min-h-screen`}>
              <Header />
              <main className="flex flex-col grow justify-center items-center text-neutral-700">
                {children}
              </main>
              <Footer />
            </body>
          </NextIntlClientProvider>
        </html>
      </StoreProvider>
      {/* </Provider> */}
      {/* </GlobalStateProvider> */}
    </AuthProvider>
  );
};

export default RootLayout;
