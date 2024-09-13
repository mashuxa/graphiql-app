import { NextRequest } from "next/server";
import { handleFetch } from "src/app/api/[locale]/handleFetch";
import { HttpMethod } from "src/types";

export const revalidate = 0;

interface Params {
  params: { path: [string, string] };
}

export const GET = async (
  request: NextRequest,
  { params: { path } }: Params,
): Promise<Response> => handleFetch(request, [HttpMethod.post, ...path], true);
