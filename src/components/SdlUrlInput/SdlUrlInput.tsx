"use client";

import { usePathname } from "next/navigation";
import { ChangeEvent, FC, useEffect, useState } from "react";
import FormField from "src/components/FormField/FormField";
import { getUrlData } from "src/utils/headersUtils";

interface UrlInputProps {
  isUpdateUrl?: boolean;
}

const SdlUrlInput: FC<UrlInputProps> = () => {
  const [value, setValue] = useState("");
  const pathname = usePathname();
  const handleChange = ({
    currentTarget,
  }: ChangeEvent<HTMLInputElement>): void => setValue(currentTarget.value);

  useEffect(() => {
    const { url } = getUrlData();

    setValue(url && `${url}?sdl`);
  }, [pathname]);

  return (
    <FormField
      data-testid="sdl-input"
      className="flex-grow"
      type="url"
      value={value}
      name="sdlUrl"
      placeholder="Sdl Url"
      onChange={handleChange}
    />
  );
};

export default SdlUrlInput;
