"use client";

import { FC, PropsWithChildren } from "react";
import Button from "src/components/Button/Button";
import { routes } from "src/constants";
import { signInWithGoogle } from "src/firebase/auth/auth";
import useAuthRedirect from "src/hooks/useAuthRedirect/useAuthRedirect";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  useAuthRedirect(true, routes.home);

  return (
    <div className="bg-white p-8">
      {children}
      <Button className="mt-6" onClick={signInWithGoogle}>
        Continue with Google
      </Button>
    </div>
  );
};

export default Layout;
