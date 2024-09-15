"use client";

import { FC, useEffect, useState } from "react";
import BodyEditor, {
  BodyEditorTypes,
} from "src/components/BodyEditor/BodyEditor";
import Button from "src/components/Button/Button";
import HeadersList from "src/components/HeadersList/HeadersList";
import ResponseData from "src/components/ResponseData/ResponseData";
import UrlInput from "src/components/UrlInput/UrlInput";
import VariablesList from "src/components/VariablesList/VariablesList";
import useFormAction from "src/hooks/useFormAction/useFormAction";
import { setContentType } from "src/store/contentTypeSlice";
import { useAppDispatch } from "src/store/hooks";
import { setMethod } from "src/store/methodSlice";
import { ContentType, HttpMethod } from "src/types";
import { graphqlSchema } from "src/validation/validationSchemas";
import * as yup from "yup";

const errorMessageClass = "text-red-500 text-sm";

const GraphiqlForm: FC = () => {
  const { response, isLoading, handleSubmit } = useFormAction();
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<{ [key: string]: { message: string } }>(
    {},
  );

  useEffect(() => {
    dispatch(setMethod(HttpMethod.post));
    dispatch(
      setContentType(Object.keys(ContentType)[0] as typeof ContentType.json),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validate = async (data: {
    [key: string]: FormDataEntryValue | null;
  }): Promise<boolean> => {
    try {
      await graphqlSchema.validate(data, { abortEarly: false });
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
    const url = formData.get("url");
    const body = formData.get("body");

    if (!(await validate({ url, body }))) {
      return;
    }
    handleSubmit();
  };

  return (
    <>
      <form
        data-testid="graphiql-form"
        className={isLoading ? "animate-blink" : ""}
        onSubmit={onSubmit}
      >
        <div className="flex border">
          <UrlInput data-testid="graphiql-url-input" />
          {errors.url && (
            <div className={errorMessageClass}>{errors.url.message}</div>
          )}
          <Button
            data-testid="graphiql-send"
            className="border-none bg-primary px-8 hover:text-secondary"
          >
            SEND
          </Button>
        </div>
        <HeadersList />
        <BodyEditor readOnly={false} type={BodyEditorTypes.graphql} />
        {errors.body && (
          <div className={errorMessageClass}>{errors.body.message}</div>
        )}
        <VariablesList />
      </form>
      {response && (
        <ResponseData {...response} data-testid="graphiql-response" />
      )}
    </>
  );
};

export default GraphiqlForm;
