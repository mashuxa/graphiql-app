"use client";

import { useFormik } from "formik";
import { NextPage } from "next";
import { useTranslations } from "next-intl";
import Button from "src/components/Button/Button";
import FormField from "src/components/FormField/FormField";
import { routes } from "src/constants";
import { signIn } from "src/firebase/auth/auth";
import { Link } from "src/i18n.config";
import { useNotification } from "src/providers/NotificationProvider/NotificationProvider";
import { NotificationType } from "src/providers/NotificationProvider/types";
import { loginSchema } from "src/validation/validationSchemas";

const errorMessageClass = "text-red-500 text-sm";

const SignIn: NextPage = () => {
  const t = useTranslations("SignIn");
  const errors = useTranslations("Errors");
  const { showNotification } = useNotification();

  const handleSubmit = async (
    values: Record<string, string>,
  ): Promise<void> => {
    if (values.email && values.password) {
      try {
        await signIn(values.email, values.password);
      } catch (code) {
        showNotification(NotificationType.Error, "Auth error", errors(code));
      }
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

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center">{t("title")}</h1>
      <form
        data-testid="sign-in"
        className="space-y-4"
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
