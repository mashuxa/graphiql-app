"use client";

import { FC, useContext } from "react";
import Navigation from "src/components/Navigation/Navigation";
import { routes } from "src/constants";
import { AuthContext } from "src/providers/AuthProvider/AuthProvider";

import { useTranslations } from "next-intl";

const authLinks = [
  { href: routes.signIn, title: "Sign In" },
  { href: routes.signUp, title: "Sign Up" },
];
const navLinks = [
  { href: routes.restClient, title: "REST Client" },
  { href: routes.graphiqlClient, title: "GraphiQL Client" },
  { href: routes.history, title: "History" },
];

const Greeting: FC = () => {
  const { user } = useContext(AuthContext);

  const t = useTranslations("Greeting");

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {user
          ? t("auth-greeting", { username: user.name })
          : t("unauth-greeting")}
      </h2>
      <Navigation links={user ? navLinks : authLinks} />
    </>
  );
};

export default Greeting;
