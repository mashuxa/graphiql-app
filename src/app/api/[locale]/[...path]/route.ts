import { NextResponse, type NextRequest } from "next/server";
import { FetchOptions } from "src/fetch/types";
import { HttpMethod } from "src/types";
import { decodeFromBase64 } from "src/utils/utils";

const methodsWithBody = [
  HttpMethod.post,
  HttpMethod.put,
  HttpMethod.patch,
  HttpMethod.delete,
];

interface Params {
  params: { path: [HttpMethod, string, string] };
}

export const GET = async (
  request: NextRequest,
  { params: { path } }: Params,
): Promise<Response> => {
  const [method, urlBase64, bodyBase64] = path;
  const searchParams = request.nextUrl.searchParams.entries();

  if (!method || !urlBase64) {
    return NextResponse.json(
      { data: "Here will be response data" },
      { status: 0 },
    );
  }

  const url = decodeFromBase64(urlBase64);
  const body = decodeFromBase64(bodyBase64);
  const headers: Record<string, string> = Object.fromEntries(searchParams);

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
    return await fetch(url, options);
  } catch (error) {
    // обработать ошибки по таймауту, сервер не доступен и тп
    console.error("Error fetching data:", error);
    throw error;
  }
};
