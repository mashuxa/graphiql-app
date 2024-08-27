"use client";

import { FC, PropsWithChildren } from "react";
import Button from "src/components/Button/Button";
import { routes } from "src/constants";
import { signInWithGoogle } from "src/firebase/auth/auth";
import useAuthRedirect from "src/hooks/useAuthRedirect/useAuthRedirect";

import { useTranslations } from "next-intl";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const t = useTranslations("publicLayout");

  useAuthRedirect(true, routes.home);

  return (
    <div className="bg-white p-8">
      {children}
      <Button className="mt-6" onClick={signInWithGoogle}>
        {t("signInWithGoogle")}
      </Button>
    </div>
  );
};

export default Layout;
