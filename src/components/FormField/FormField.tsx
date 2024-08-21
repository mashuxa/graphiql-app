"use client";

import { FC, InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const FormField: FC<FormFieldProps> = ({ label, ...props }) => {
  return (
    <label>
      {label}
      <input {...props} className="w-full p-2 border" required />
    </label>
  );
};

export default FormField;
