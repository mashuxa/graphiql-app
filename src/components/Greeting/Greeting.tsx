"use client";

import { FC, useContext } from "react";
import Navigation from "src/components/Navigation/Navigation";
import { routes } from "src/constants";
import { AuthContext } from "src/providers/AuthProvider/AuthProvider";

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

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {user ? `Welcome Back, ${user.name}!` : "Welcome!"}
      </h2>
      <Navigation links={user ? navLinks : authLinks} />
    </>
  );
};

export default Greeting;
