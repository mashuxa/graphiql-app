"use client";

import { FC } from "react";
import BodyEditor from "src/components/BodyEditor/BodyEditor";
import Button from "src/components/Button/Button";
import HeadersList from "src/components/HeadersList/HeadersList";
import MethodSelector from "src/components/MethodSelector/MethodSelector";
import ResponseData from "src/components/ResponseData/ResponseData";
import UrlInput from "src/components/UrlInput/UrlInput";
import VariablesList from "src/components/VariablesList/VariablesList";
import useFormAction from "src/hooks/useFormAction/useFormAction";

// todo: Variables section that can shown or hidden, specified variables are included in the body
const RestForm: FC = () => {
  const { response, isLoading, handleSubmit } = useFormAction();

  return (
    <form className={isLoading ? "animate-blink" : ""} onSubmit={handleSubmit}>
      <div className="flex border">
        <MethodSelector />
        <UrlInput />
        <Button className="border-none bg-primary px-8 hover:text-secondary">
          SEND
        </Button>
      </div>
      <HeadersList />
      <BodyEditor readOnly={false} />
      <VariablesList />
      {response && <ResponseData {...response} />}
    </form>
  );
};

export default RestForm;
