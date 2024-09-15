import beautify from "json-beautify";
import { NextRequest, NextResponse } from "next/server";
import { FetchOptions, HttpMethod } from "src/types";
import { decodeFromBase64 } from "src/utils/utils";

export const methodsWithBody = [
  HttpMethod.post,
  HttpMethod.put,
  HttpMethod.patch,
  HttpMethod.delete,
];

type Params = [HttpMethod, string, string];

export const handleFetch = async (
  request: NextRequest,
  params: Params,
  isGraphql: boolean,
): Promise<Response> => {
  const [method, urlBase64, bodyBase64] = params;
  const searchParams = request.nextUrl.searchParams.entries();

  if (!method) {
    throw Error("Method is required");
  }

  if (!urlBase64) {
    throw Error("URL is required");
  }

  const url = decodeFromBase64(urlBase64);
  const body = decodeFromBase64(bodyBase64);
  const headers: Record<string, string> = Object.fromEntries(searchParams);
  const options: FetchOptions = { method, headers };

  if (isGraphql) {
    options.body = JSON.stringify({ query: body });
  } else if (methodsWithBody.includes(method) && body) {
    options.body = body;
  }

  try {
    const response = await fetch(url, options);
    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");
    const data = isJson ? await response.json() : await response.text();
    // @ts-expect-error because of json-beautify incorrect types
    const formattedData = isJson ? beautify(data, null, 2, 120) : data;

    return NextResponse.json(formattedData, { status: response.status });
  } catch {
    throw new Error("Connection error");
  }
};
