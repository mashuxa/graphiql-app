import beautify from "json-beautify";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { HttpMethod } from "src/types";
import { decodeFromBase64 } from "src/utils/utils";

export type FetchOptions = {
  method: HttpMethod;
  headers: Record<string, string>;
  body?: string;
};

const methodsWithBody = [
  HttpMethod.post,
  HttpMethod.put,
  HttpMethod.patch,
  HttpMethod.delete,
];

export const fetchRestData = async (
  params: Params,
  searchParams: Record<string, string>,
): Promise<{
  status: number;
  data: string;
}> => {
  const method = params.method;
  const urlBase64 = params.urlBody?.[0];
  const bodyBase64 = params.urlBody?.[1];

  if (!method || !urlBase64) {
    return { status: 0, data: "Here will be response data" };
  }

  const url = decodeFromBase64(urlBase64);
  const body = decodeFromBase64(bodyBase64);
  const headers: Record<string, string> = {};

  if (searchParams) {
    for (const key in searchParams) {
      headers[key] = searchParams[key];
    }
  }

  // надо брать из headers и там они должны появлятся (как серчпарамсы в юрл) когда выбраны методы с body и вводится body
  if (methodsWithBody.includes(method) && body) {
    headers["Content-Type"] = "application/json";
  }

  const options: FetchOptions = {
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
