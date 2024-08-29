import { FC, InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const FormField: FC<FormFieldProps> = ({ label, className, ...props }) => {
  return (
    <div className={className}>
      {label && <label>{label}</label>}
      <input
        {...props}
        className="w-full bg-transparent border outline-primary p-2"
        required
      />
    </div>
  );
};

export default FormField;
