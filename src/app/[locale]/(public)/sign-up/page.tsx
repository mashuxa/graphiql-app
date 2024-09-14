"use client";

import { useFormik } from "formik";
import { NextPage } from "next";
import { useTranslations } from "next-intl";
import Button from "src/components/Button/Button";
import FormField from "src/components/FormField/FormField";
import { routes } from "src/constants";
import { signUp } from "src/firebase/auth/auth";
import { Link } from "src/i18n.config";
import { registrationSchema } from "src/validation/validationSchemas";

const errorMessageClass = "text-red-500 text-sm";

// @todo: add validation
const SignUp: NextPage = () => {
  const t = useTranslations("SignUp");

  const handleSubmit = async (
    values: Record<string, string>,
  ): Promise<void> => {
    if (
      values.email &&
      values.password &&
      name &&
      values.password === values.repeatPassword
    ) {
      await signUp(values.name, values.email, values.password);
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

  // const handleSubmit = async (
  //   event: FormEvent<HTMLFormElement>,
  // ): Promise<void> => {
  //   event.preventDefault();

  //   const formData = new FormData(event.currentTarget);
  //   const name = formData.get("name") as string;
  //   const email = formData.get("email") as string;
  //   const password = formData.get("password") as string;
  //   const repeatPassword = formData.get("repeatPassword") as string;

  //   if (email && password && name && password === repeatPassword) {
  //     await signUp(name, email, password);
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
        <Button>{t("submit")}</Button>
      </form>
      <div className="pt-8 text-center">
        <Link href={routes.signIn}>{t("signIn")}</Link>
      </div>
    </>
  );
};

export default SignUp;
