"use client";

import { FC, InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const FormField: FC<FormFieldProps> = ({ label, ...props }) => {
  const input = (
    <input
      {...props}
      className="input w-full p-2 border -outline-offset-2"
      required
    />
  );

  return label ? <label>{input}</label> : input;
};

export default FormField;
