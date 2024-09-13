import { NextRequest, NextResponse } from "next/server";
import { FetchOptions, HttpMethod } from "src/types";
import { decodeFromBase64 } from "src/utils/utils";

const methodsWithBody = [
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

  // @todo: json || text
  if (methodsWithBody.includes(method) && body) {
    headers["Content-Type"] = "application/json";
  }

  const options: FetchOptions = { method, headers };

  if (isGraphql) {
    options.body = JSON.stringify({ query: body });
  } else if (methodsWithBody.includes(method) && body) {
    options.body = body;
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    // обработать ошибки по таймауту, сервер не доступен и тп
    console.error("Error fetching data:", error);
    throw error;
  }
};
