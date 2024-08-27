"use client";

import { FC, InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const FormField: FC<FormFieldProps> = ({ label, ...props }) => {
  const input = <input {...props} className="w-full p-2 border" required />;

  return label ? <label>{input}</label> : input;
};

export default FormField;
