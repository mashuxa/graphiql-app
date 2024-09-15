import { buildClientSchema, getIntrospectionQuery, printSchema } from "graphql";
import { FetchOptions, HttpMethod } from "src/types";

export const fetchGraphqlSchema = async (
  url: string,
): Promise<{
  status: number;
  schema: string;
}> => {
  const method = HttpMethod.post;
  const headers: Record<string, string> = {};

  headers["Content-Type"] = "application/json";

  const options: FetchOptions = {
    method,
    headers,
  };

  options.body = JSON.stringify({ query: getIntrospectionQuery() });

  const printedSchema: { status: number; schema: string } = {
    status: -1,
    schema: "",
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    throw Error();
  }

  const { data } = await response.json();
  const schema = buildClientSchema(data);

  printedSchema.schema = printSchema(schema);
  printedSchema.status = response.status;

  return printedSchema;
};
