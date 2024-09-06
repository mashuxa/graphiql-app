"use client";

import { ChangeEvent, FC, useEffect, useState } from "react";
import FormField from "src/components/FormField/FormField";
import { ArgType, getUrlData, replaceUrlData } from "src/utils/headersUtils";

// todo: add support cyrillic symbols
const UrlInput: FC = () => {
  const [value, setValue] = useState("");
  const handleChange = ({
    currentTarget,
  }: ChangeEvent<HTMLInputElement>): void => {
    setValue(currentTarget.value);
    replaceUrlData(ArgType.url, currentTarget.value);
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
    />
  );
};

export default UrlInput;
