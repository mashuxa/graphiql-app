"use client";

import { useFormik } from "formik";
import { NextPage } from "next";
import { useTranslations } from "next-intl";
import Button from "src/components/Button/Button";
import FormField from "src/components/FormField/FormField";
import { routes } from "src/constants";
import { signIn } from "src/firebase/auth/auth";
import { Link } from "src/i18n.config";
import { loginSchema } from "src/validation/validationSchemas";

const errorMessageClass = "text-red-500 text-sm";

// @todo: add validation
const SignIn: NextPage = () => {
  const t = useTranslations("SignIn");

  const handleSubmit = async (
    values: Record<string, string>,
  ): Promise<void> => {
    if (values.email && values.password) {
      await signIn(values.email, values.password);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: handleSubmit,
  });

  // const handleSubmit = async (
  //   event: FormEvent<HTMLFormElement>,
  // ): Promise<void> => {
  //   event.preventDefault();

  //   const formData = new FormData(event.currentTarget);
  //   const email = formData.get("email") as string;
  //   const password = formData.get("password") as string;

  //   if (email && password) {
  //     await signIn(email, password);
  //   }
  // };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center">{t("title")}</h1>
      <form
        data-testid="sign-in-main"
        className="space-y-4"
        // onSubmit={handleSubmit}
        onSubmit={formik.handleSubmit}
      >
        <FormField
          label={t("email")}
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email ? (
          <div className={errorMessageClass}>{formik.errors.email}</div>
        ) : null}
        <FormField
          label={t("password")}
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && formik.touched.password ? (
          <div className={errorMessageClass}>{formik.errors.password}</div>
        ) : null}
        <Button type="submit" className="mx-auto">
          {t("submit")}
        </Button>
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
