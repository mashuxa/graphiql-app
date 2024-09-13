import { type NextRequest } from "next/server";
import { handleFetch } from "src/app/api/[locale]/handleFetch";
import { HttpMethod } from "src/types";

export const revalidate = 0;

interface Params {
  params: { path: [HttpMethod, string, string] };
}

export const GET = async (
  request: NextRequest,
  { params: { path } }: Params,
): Promise<Response> => handleFetch(request, path, false);
