"use client";

import { FC, PropsWithChildren } from "react";
import AuthRedirect from "src/components/AuthRedirect/AuthRedirect";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div data-testid="main" className="w-full max-w-screen-2xl px-4 py-8">
      <AuthRedirect />
      {children}
    </div>
  );
};

export default Layout;
