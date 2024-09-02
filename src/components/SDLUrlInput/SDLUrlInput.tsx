"use client";
import { FC } from "react";
import FormField from "src/components/FormField/FormField";

interface SDLUrlInputProps {
  defaultValue: string;
}

const SDLUrlInput: FC<SDLUrlInputProps> = ({
  defaultValue,
}: SDLUrlInputProps) => {
  const handleChange = (): void => {};

  return (
    <FormField
      className="flex-grow"
      inputClassName="border-none"
      defaultValue={defaultValue}
      name="sdlUrl"
      placeholder="SDL Url"
      onChange={handleChange}
    />
  );
};

export default SDLUrlInput;
