"use client";

import { NextPage } from "next";
import { FormEvent } from "react";
import BodyEditor from "src/components/BodyEditor/BodyEditor";
import Button from "src/components/Button/Button";
import HeadersList from "src/components/HeadersList/HeadersList";
import MethodSelector from "src/components/MethodSelector/MethodSelector";
import SectionTitle from "src/components/SectionTitle/SectionTitle";
import UrlInput from "src/components/UrlInput/UrlInput";
import { getUrlHeaders } from "src/utils/headersUtils";

// todo: Variables section that can shown or hidden, specified variables are included in the body
const RestClient: NextPage = () => {
  // const [response, setResponse] = useState();

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const method = data.get("method");
    const url = data.get("url");
    const body = data.get("body");
    const contentType = data.get("contentType");
    const headers = getUrlHeaders().reduce(
      (acc, { key, value }) => (key ? { ...acc, [key]: value } : acc),
      {},
    );

    console.log(method, url, body, headers, contentType);

    // 1) await request
    // 2) setResponse
  };

  return (
    <div data-testid="rest-main" className="w-full max-w-screen-xl px-4 py-8">
      <h1 className="text-2xl pb-4">Rest Client</h1>
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
      </form>
      <hr className="mt-8" />

      <SectionTitle>Response:</SectionTitle>
      <p>
        Status: <span>statusCode</span>
      </p>
      <p>Body:</p>
      <div>response here</div>
    </div>
  );
};

export default RestClient;
