import beautify from "json-beautify";
import { FetchOptions } from "src/fetch/types";

export const fetchData = async (
  url: string,
  options: FetchOptions,
): Promise<{
  status: number;
  data: string;
}> => {
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
    //console.error("Error fetching data:", error);
    throw error;
  }
};

export const buildHeadersFromSearchParams = (
  searchParams: Record<string, string>,
): Record<string, string> => {
  const headers: Record<string, string> = {};

  if (searchParams) {
    for (const key in searchParams) {
      headers[key] = searchParams[key];
    }
  }

  return headers;
};
