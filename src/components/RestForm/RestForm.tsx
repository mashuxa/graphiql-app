"use client";

import beautify from "json-beautify";
import { FC, FormEvent, useState } from "react";
import BodyEditor from "src/components/BodyEditor/BodyEditor";
import Button from "src/components/Button/Button";
import HeadersList from "src/components/HeadersList/HeadersList";
import MethodSelector from "src/components/MethodSelector/MethodSelector";
import SectionTitle from "src/components/SectionTitle/SectionTitle";
import UrlInput from "src/components/UrlInput/UrlInput";
import VariablesList from "../VariablesList/VariablesList";

interface ResponseData {
  status: number;
  data: string;
}

const defaultResponseData: ResponseData = {
  status: 0,
  data: "",
};

// todo: Variables section that can shown or hidden, specified variables are included in the body
const RestForm: FC = () => {
  const [response, setResponse] = useState<ResponseData>(defaultResponseData);
  // TODO: add validation
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    const { pathname, search } = window.location;
    const response = await fetch(`/api${pathname}${search}`);

    if (response.ok) {
      const responseJson = await response.json();
      // @ts-expect-error because of json-beautify incorrect types
      const data = beautify(responseJson, null, 2, 120);

      setResponse({ status: response.status, data });
    } else {
      const data = await response.text();

      setResponse({ status: response.status, data });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex border">
        <MethodSelector />
        <UrlInput />
        <Button className="border-none bg-primary px-8 hover:text-secondary">
          SEND
        </Button>
      </div>

      <SectionTitle>Headers:</SectionTitle>
      <HeadersList />

      <SectionTitle>Body:</SectionTitle>
      <BodyEditor readOnly={false} />

      <SectionTitle>Variables:</SectionTitle>
      <VariablesList />

      <SectionTitle>Response:</SectionTitle>
      <p>
        Status: <span>{response.status}</span>
      </p>
      <p>Body:</p>
      <pre className="overflow-auto">{response.data}</pre>
    </form>
  );
};

export default RestForm;
