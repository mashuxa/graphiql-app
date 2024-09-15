"use client";

import { FC, useState } from "react";
import BodyEditor from "src/components/BodyEditor/BodyEditor";
import Button from "src/components/Button/Button";
import HeadersList from "src/components/HeadersList/HeadersList";
import MethodSelector from "src/components/MethodSelector/MethodSelector";
import ResponseData from "src/components/ResponseData/ResponseData";
import UrlInput from "src/components/UrlInput/UrlInput";
import VariablesList from "src/components/VariablesList/VariablesList";
import useFormAction from "src/hooks/useFormAction/useFormAction";
import { restSchema } from "src/validation/validationSchemas";
import * as yup from "yup";

const errorMessageClass = "text-red-500 text-sm";

const RestForm: FC = () => {
  const { response, isLoading, handleSubmit } = useFormAction();
  const [errors, setErrors] = useState<{ [key: string]: { message: string } }>(
    {},
  );

  const validate = async (data: {
    [key: string]: FormDataEntryValue | null;
  }): Promise<boolean> => {
    try {
      await restSchema.validate(data, { abortEarly: false });
      setErrors({});

      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: { [key: string]: { message: string } } = {};

        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = { message: error.message };
          }
        });

        setErrors(newErrors);
      }

      return false;
    }
  };

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const method = formData.get("method");
    const url = formData.get("url");
    const body = formData.get("body");

    if (!(await validate({ method, url, body }))) {
      return;
    }

    handleSubmit();
  };

  return (
    <form
      data-testid="rest-form"
      className={isLoading ? "animate-blink" : ""}
      onSubmit={onSubmit}
    >
      <div className="flex border">
        <MethodSelector />
        {errors.method && (
          <div className={errorMessageClass}>{errors.method.message}</div>
        )}
        <UrlInput data-testid="rest-url-input" />
        {errors.url && (
          <div className={errorMessageClass}>{errors.url.message}</div>
        )}
        <Button
          data-testid="rest-send"
          className="border-none bg-primary px-8 hover:text-secondary"
        >
          SEND
        </Button>
      </div>
      <HeadersList />
      <BodyEditor readOnly={false} />
      {errors.body && (
        <div className={errorMessageClass}>{errors.body.message}</div>
      )}
      <VariablesList />
      {response && <ResponseData {...response} />}
    </form>
  );
};

export default RestForm;
