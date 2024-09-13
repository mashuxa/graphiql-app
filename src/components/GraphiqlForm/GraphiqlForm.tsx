"use client";

import { FC } from "react";
import ResponseData from "src/components/ResponseData/ResponseData";
import useFormAction from "src/hooks/useFormAction/useFormAction";
import BodyEditor, { BodyEditorTypes } from "../BodyEditor/BodyEditor";
import Button from "../Button/Button";
import HeadersList from "../HeadersList/HeadersList";
import UrlInput from "../UrlInput/UrlInput";
import VariablesList from "../VariablesList/VariablesList";

const GraphiqlForm: FC = () => {
  const { response, isLoading, handleSubmit } = useFormAction();

  return (
    <>
      <form
        className={isLoading ? "animate-blink" : ""}
        onSubmit={handleSubmit}
      >
        <div className="flex border">
          <UrlInput />
          <Button className="border-none bg-primary px-8 hover:text-secondary">
            SEND
          </Button>
        </div>
        <HeadersList />
        <BodyEditor readOnly={false} type={BodyEditorTypes.graphql} />
        <VariablesList />
      </form>
      {response && <ResponseData {...response} />}
    </>
  );
};

export default GraphiqlForm;
