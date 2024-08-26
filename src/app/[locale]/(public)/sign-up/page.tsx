"use client";

import { NextPage } from "next";
// import Link from "next/link";
import { FormEvent } from "react";
import Button from "src/components/Button/Button";
import FormField from "src/components/FormField/FormField";
import { routes } from "src/constants";
import { signUp } from "src/firebase/auth/auth";
import { Link } from "../../../../../i18n.config";

// @todo: add validation
const SignUp: NextPage = () => {
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
      <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
      <form
        data-testid="sign-in-main"
        className="space-y-4"
        onSubmit={handleSubmit}
      >
        <FormField label="Name" name="name" type="text" />
        <FormField label="Email" name="email" type="email" />
        <FormField label="Password" name="password" type="password" />
        <FormField
          label="Repeat Password"
          name="repeatPassword"
          type="password"
        />
        <Button>Submit</Button>
      </form>
      <div className="pt-8 text-center">
        <Link href={routes.signIn}>Sign In</Link>
      </div>
    </>
  );
};

export default SignUp;
