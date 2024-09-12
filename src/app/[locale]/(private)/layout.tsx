"use client";

import { FC, PropsWithChildren } from "react";
import AuthRedirect from "src/components/AuthRedirect/AuthRedirect";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AuthRedirect />
      {children}
    </>
  );
};

export default Layout;
