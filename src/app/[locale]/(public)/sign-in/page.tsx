"use client";

import { NextPage } from "next";
import { FormEvent } from "react";
import Button from "src/components/Button/Button";
import FormField from "src/components/FormField/FormField";
import { routes } from "src/constants";
import { signIn } from "src/firebase/auth/auth";

import { Link } from "src/i18n.config";

import { useTranslations } from "next-intl";

// @todo: add validation
const SignIn: NextPage = () => {
  const t = useTranslations("SignIn");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (email && password) {
      await signIn(email, password);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center">{t("title")}</h1>
      <form
        data-testid="sign-in-main"
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        <FormField label={t("email")} name="email" type="email" />
        <FormField label={t("password")} name="password" type="password" />
        <Button>{t("submit")}</Button>
      </form>
      <div className="pt-8 text-center">
        <Link href={routes.reset}>{t("resetPassword")}</Link>
        <span> | </span>
        <Link href={routes.signUp}>{t("signUp")}</Link>
      </div>
    </>
  );
};

export default SignIn;
