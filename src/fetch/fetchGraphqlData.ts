import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { HttpMethod } from "src/types";
import { decodeFromBase64 } from "src/utils/utils";
import { buildHeadersFromSearchParams, fetchData } from "./fetch.helper";
import { FetchOptions, methodsWithBody } from "./fetch.types";

export const fetchGraphqlData = async (
  params: Params,
  searchParams: Record<string, string>,
): Promise<{
  status: number;
  data: string;
}> => {
  const method = HttpMethod.post;
  const urlBase64 = params.urlBody?.[0];
  const bodyBase64 = params.urlBody?.[1];

  if (!method || !urlBase64) {
    return { status: 0, data: "Here will be response data" };
  }

  const url = decodeFromBase64(urlBase64);
  const body = decodeFromBase64(bodyBase64);
  const headers = buildHeadersFromSearchParams(searchParams);

  headers["Content-Type"] = "application/json";

  const options: FetchOptions = {
    method,
    headers,
  };

  if (methodsWithBody.includes(method) && body) {
    options.body = JSON.stringify({ query: body });
  }

  return fetchData(url, options);
};
