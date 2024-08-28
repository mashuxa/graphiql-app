import { FC, InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  inputClassName?: string;
}

const FormField: FC<FormFieldProps> = ({
  label,
  className,
  inputClassName,
  ...props
}) => {
  return (
    <div className={className}>
      {label && <label>{label}</label>}
      <input
        {...props}
        className={`w-full bg-transparent border outline-primary p-2 ${inputClassName}`}
        required
      />
    </div>
  );
};

export default FormField;
