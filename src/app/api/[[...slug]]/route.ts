import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: Params,
): Promise<NextResponse> {
  const [method, url, body] = params.slug;

  console.log(method, url, body);

  return NextResponse.json({ success: true }, { status: 200 });
}
