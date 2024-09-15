"use client";

import { useFormik } from "formik";
import { NextPage } from "next";
import { useTranslations } from "next-intl";
import Button from "src/components/Button/Button";
import FormField from "src/components/FormField/FormField";
import { routes } from "src/constants";
import { signUp } from "src/firebase/auth/auth";
import { Link } from "src/i18n.config";
import { useNotification } from "src/providers/NotificationProvider/NotificationProvider";
import { NotificationType } from "src/providers/NotificationProvider/types";
import { registrationSchema } from "src/validation/validationSchemas";

const errorMessageClass = "text-red-500 text-sm";

const SignUp: NextPage = () => {
  const t = useTranslations("SignUp");
  const errors = useTranslations("Errors");
  const { showNotification } = useNotification();

  const handleSubmit = async (
    values: Record<string, string>,
  ): Promise<void> => {
    if (
      values.email &&
      values.password &&
      values.name &&
      values.password === values.repeatPassword
    ) {
      try {
        await signUp(values.name, values.email, values.password);
      } catch (code) {
        showNotification(NotificationType.Error, "Auth error", errors(code));
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: registrationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center">{t("title")}</h1>
      <form
        data-testid="sign-up"
        className="space-y-4"
        onSubmit={formik.handleSubmit}
      >
        <FormField
          label={t("name")}
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name && formik.touched.name ? (
          <div className={errorMessageClass}>{formik.errors.name}</div>
        ) : null}
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
        <FormField
          label={t("repeatPassword")}
          name="repeatPassword"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.repeatPassword}
        />
        {formik.errors.repeatPassword && formik.touched.repeatPassword ? (
          <div className={errorMessageClass}>
            {formik.errors.repeatPassword}
          </div>
        ) : null}
        <Button type="submit">{t("submit")}</Button>
      </form>
      <div className="pt-8 text-center">
        <Link href={routes.signIn}>{t("signIn")}</Link>
      </div>
    </>
  );
};

export default SignUp;
