"use client";

import { ChangeEvent, FC, useEffect, useState } from "react";
import FormField from "src/components/FormField/FormField";
import { ArgType, getUrlData, replaceUrlData } from "src/utils/headersUtils";

interface UrlInputProps {
  isUpdateUrl?: boolean;
}

const UrlInput: FC<UrlInputProps> = ({
  isUpdateUrl = true,
  ...props
}: UrlInputProps) => {
  const [value, setValue] = useState("");

  const handleChange = ({
    currentTarget,
  }: ChangeEvent<HTMLInputElement>): void => {
    if (currentTarget.value.match(/[а-яА-Я]/)) return;
    setValue(currentTarget.value);

    if (isUpdateUrl) {
      replaceUrlData(ArgType.url, currentTarget.value);
    }
  };

  useEffect(() => {
    const defaultValue = getUrlData().url;

    if (defaultValue) {
      setValue(defaultValue);
    }
  }, []);

  return (
    <FormField
      className="flex-grow"
      type="url"
      inputClassName="border-none"
      value={value}
      name="url"
      placeholder="Url"
      onChange={handleChange}
      {...props}
    />
  );
};

export default UrlInput;
