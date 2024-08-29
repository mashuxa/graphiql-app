"use client";

import { useTranslations } from "next-intl";
import { FC, useContext } from "react";
import Preloader from "src/components/Preloader/Preloader";
import { routes } from "src/constants";
import { signOut } from "src/firebase/auth/auth";
import { Link } from "src/i18n.config";
import { AuthContext } from "src/providers/AuthProvider/AuthProvider";

const AuthButton: FC = () => {
  const { user, loading } = useContext(AuthContext);

  const t = useTranslations("AuthButton");

  const handleSignOut = (): void => {
    void signOut();
  };

  return (
    <>
      {loading && <Preloader className="absolute inset-0" />}
      {user ? (
        <button
          type="button"
          className="transition cursor-pointer text-neutral-500 hover:text-neutral-300 p-3"
          onClick={handleSignOut}
        >
          {t("signOut")}
        </button>
      ) : (
        <Link className="inline-block text-primary p-3" href={routes.signIn}>
          {t("signIn")}
        </Link>
      )}
    </>
  );
};

export default AuthButton;
