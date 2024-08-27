"use client";

import { FC, PropsWithChildren } from "react";
// import { routes } from "src/constants";
// import useAuthRedirect from "src/hooks/useAuthRedirect/useAuthRedirect";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  // useAuthRedirect(false, routes.signIn);

  return children;
};

export default Layout;
