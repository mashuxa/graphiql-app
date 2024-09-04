"use server";

import beautify from "json-beautify";
import { NextPage } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import BodyEditor from "src/components/BodyEditor/BodyEditor";
import FetchButton from "src/components/FetchButton/FetchButton";
import HeadersList from "src/components/HeadersList/HeadersList";
import MethodSelector from "src/components/MethodSelector/MethodSelector";
import SectionTitle from "src/components/SectionTitle/SectionTitle";
import UrlInput from "src/components/UrlInput/UrlInput";
import { HttpMethod } from "src/types";
import { decodeFromBase64 } from "src/utils/utils";

type Options = {
  method: HttpMethod;
  headers: Record<string, string>;
  body?: string;
};

const fetchData = async (
  params: Params,
  searchParams: Record<string, string>,
): Promise<{
  status: number;
  data: string;
}> => {
  const method = params.params?.[0] || "GET";
  const url = decodeFromBase64(params.params?.[1]) || "";
  const body = decodeFromBase64(params.params?.[2]) || "";

  if (!url) {
    return { status: 0, data: "Here will be response data" };
  }

  const headers: Record<string, string> = {};

  if (searchParams) {
    for (const key in searchParams) {
      headers[key] = searchParams[key];
    }
  }

  const methodsWithBody = [
    HttpMethod.post,
    HttpMethod.put,
    HttpMethod.patch,
    HttpMethod.delete,
  ];

  // надо брать из headers и там они должны появлятся (как серчпарамсы в юрл) когда выбраны методы с body и вводится body
  if (methodsWithBody.includes(method) && body) {
    headers["Content-Type"] = "application/json";
  }

  const options: Options = {
    method,
    headers,
  };

  if (methodsWithBody.includes(method) && body) {
    options.body = body;
  }

  try {
    const response = await fetch(url, options);

    const status = response.status;

    if (response.ok) {
      const responseJson = await response.json();

      // @ts-expect-error because of json-beautify incorrect types
      const data = beautify(responseJson, null, 2, 120);

      return { status, data };
    } else {
      const data = await response.text();

      return { status, data };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// todo: Variables section that can shown or hidden, specified variables are included in the body
const RestClient: NextPage<{
  params: Params;
  searchParams: Record<string, string>;
}> = async ({ params, searchParams }) => {
  const { status, data } = await fetchData(params, searchParams);

  return (
    <div data-testid="rest-main" className="w-full max-w-screen-xl px-4 py-8">
      <h1 className="text-2xl pb-4">Rest Client</h1>
      <form>
        <div className="flex border">
          <MethodSelector />
          <UrlInput />
          <FetchButton
            type="button"
            className="border-none bg-primary px-8 hover:text-secondary"
          >
            Fetch
          </FetchButton>
        </div>

        <SectionTitle>Headers:</SectionTitle>
        <HeadersList />

        <SectionTitle>Body:</SectionTitle>
        <BodyEditor readOnly={false} />
      </form>
      <hr className="mt-8" />

      <SectionTitle>Response:</SectionTitle>
      <p>
        Status: <span>{status}</span>
      </p>
      <p>Body:</p>
      <pre>{data}</pre>
    </div>
  );
};

export default RestClient;
