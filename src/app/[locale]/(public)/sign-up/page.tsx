"use client";

import { NextPage } from "next";
import { FormEvent } from "react";
import Button from "src/components/Button/Button";
import FormField from "src/components/FormField/FormField";
import { routes } from "src/constants";
import { signUp } from "src/firebase/auth/auth";
import { Link } from "src/i18n.config";

import { useTranslations } from "next-intl";

// @todo: add validation
const SignUp: NextPage = () => {
  const t = useTranslations("SignUp");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const repeatPassword = formData.get("repeatPassword") as string;

    if (email && password && name && password === repeatPassword) {
      await signUp(name, email, password);
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
        <FormField label={t("name")} name="name" type="text" />
        <FormField label={t("email")} name="email" type="email" />
        <FormField label={t("password")} name="password" type="password" />
        <FormField
          label={t("repeatPassword")}
          name="repeatPassword"
          type="password"
        />
        <Button>{t("submit")}</Button>
      </form>
      <div className="pt-8 text-center">
        <Link href={routes.signIn}>{t("signIn")}</Link>
      </div>
    </>
  );
};

export default SignUp;
