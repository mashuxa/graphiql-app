"use client";

import { FC } from "react";
import { routes } from "src/constants";
import useAuthRedirect from "src/hooks/useAuthRedirect/useAuthRedirect";

const AuthRedirect: FC = () => {
  useAuthRedirect(false, routes.signIn);

  return null;
};

export default AuthRedirect;
