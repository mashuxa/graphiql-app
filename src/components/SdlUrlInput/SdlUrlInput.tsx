"use client";

import { ChangeEvent, FC, useEffect, useState } from "react";
import FormField from "src/components/FormField/FormField";
import { useAppDispatch, useAppStore } from "src/store/hooks";
import { update } from "src/store/requestDataSlice";

interface UrlInputProps {
  isUpdateUrl?: boolean;
}

const SdlUrlInput: FC<UrlInputProps> = () => {
  const [value, setValue] = useState<string>("");
  const store = useAppStore();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const defaultValue = localStorage.getItem("SdlUrl") || "";

    setValue(defaultValue);
    dispatch(update(defaultValue));

    return (): void => {
      localStorage.setItem("SdlUrl", store.getState().requestData.sdlUrl);
    };
  }, [dispatch]);

  const handleChange = ({
    currentTarget,
  }: ChangeEvent<HTMLInputElement>): void => {
    setValue(currentTarget.value);
    dispatch(update({ sdlUrl: currentTarget.value }));
  };

  return (
    <FormField
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
