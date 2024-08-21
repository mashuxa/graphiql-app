import { Metadata } from "next";
import { Inter } from "next/font/google";
import { FC, ReactNode } from "react";
import Footer from "src/components/Footer/Footer";
import Header from "src/components/Header/Header";
import "./globals.css";

interface RootLayoutProps {
  children: ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Getman",
  description: "Light-weight platform for using apis",
};

const RootLayout: FC<Readonly<RootLayoutProps>> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
