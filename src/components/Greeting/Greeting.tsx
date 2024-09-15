"use client";

import { FC, useContext } from "react";
import Navigation from "src/components/Navigation/Navigation";
import { routes } from "src/constants";
import { AuthContext } from "src/providers/AuthProvider/AuthProvider";

import { useTranslations } from "next-intl";

const Greeting: FC = () => {
  const { user } = useContext(AuthContext);

  const t = useTranslations("Greeting");

  const authLinks = [
    { href: routes.signIn, title: t("signIn") },
    { href: routes.signUp, title: t("signUp") },
  ];
  const navLinks = [
    { href: routes.restClient, title: t("restClient") },
    { href: routes.graphiqlClient, title: t("graphiqlClient") },
    { href: routes.history, title: t("history") },
  ];

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 mt-8 text-center">
        {user
          ? t("auth-greeting", { username: user.name })
          : t("unauth-greeting")}
      </h2>
      <Navigation links={user ? navLinks : authLinks} />
    </>
  );
};

export default Greeting;
