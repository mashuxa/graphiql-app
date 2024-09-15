"use client";

import { useFormik } from "formik";
import { NextPage } from "next";
import { useTranslations } from "next-intl";
import Button from "src/components/Button/Button";
import FormField from "src/components/FormField/FormField";
import { routes } from "src/constants";
import { resetPassword } from "src/firebase/auth/auth";
import { Link } from "src/i18n.config";
import { useNotification } from "src/providers/NotificationProvider/NotificationProvider";
import { NotificationType } from "src/providers/NotificationProvider/types";
import { resetPasswordSchema } from "src/validation/validationSchemas";

const errorMessageClass = "text-red-500 text-sm";

const ResetPassword: NextPage = () => {
  const t = useTranslations("ResetPassword");
  const errors = useTranslations("Errors");
  const { showNotification } = useNotification();

  const handleSubmit = async (
    values: Record<string, string>,
  ): Promise<void> => {
    if (values.email) {
      try {
        await resetPassword(values.email);
        showNotification(
          NotificationType.Default,
          "Success",
          "Reset link sent to email",
        );
      } catch (code) {
        showNotification(NotificationType.Error, "Auth error", errors(code));
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center">{t("title")}</h1>
      <form
        data-testid="reset"
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
        <Button type="submit" className="mx-auto">
          {t("submit")}
        </Button>
      </form>
      <div className="pt-8 text-center">
        <Link href={routes.signIn}>{t("signIn")}</Link>
      </div>
    </>
  );
};

export default ResetPassword;
