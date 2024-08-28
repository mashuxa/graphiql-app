"use client";

import Link from "next/link";
import { FC, FormEvent } from "react";
import Button from "src/components/Button/Button";
import FormField from "src/components/FormField/FormField";
import { routes } from "src/constants";
import { resetPassword } from "src/firebase/auth/auth";

// @todo: add validation
const ResetPassword: FC = () => {
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;

    if (email) {
      await resetPassword(email);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center">Reset password</h1>
      <form
        data-testid="sign-in-main"
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        <FormField label="Email" name="email" type="email" />
        <Button className="mx-auto">Submit</Button>
      </form>
      <div className="pt-8 text-center">
        <Link href={routes.signIn}>Sign In</Link>
      </div>
    </>
  );
};

export default ResetPassword;
