"use client";

import { ChangeEvent, FC } from "react";
import FormField from "src/components/FormField/FormField";
import useUrlReplace from "src/hooks/useURLReplace/useURLReplace";

// todo: add support cyrillic symbols

const UrlInput: FC = () => {
  const { replace, url } = useUrlReplace();
  const handleChange = ({
    currentTarget,
  }: ChangeEvent<HTMLInputElement>): void => {
    replace({ url: currentTarget.value });
  };

  return (
    <FormField
      className="flex-grow"
      inputClassName="border-none"
      defaultValue={url}
      name="url"
      placeholder="Url"
      onChange={handleChange}
    />
  );
};

export default UrlInput;
