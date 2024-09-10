"use server";

import { NextPage } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import GraphiqlFormRedux from "src/components/GraphiqlFormRedux/GraphiqlFormRedux";
import SectionTitle from "src/components/SectionTitle/SectionTitle";
import { fetchGraphqlData } from "src/fetch/fetchGraphqlData";

const Graphiql: NextPage<{
  params: Params;
  searchParams: Record<string, string>;
}> = async ({ params, searchParams }) => {
  const { status, data } = await fetchGraphqlData(params, searchParams);

  return (
    <div data-testid="rest-main" className="w-full max-w-screen-xl px-4 py-8">
      <h1 className="text-2xl pb-4">Graphiql Client</h1>

      <GraphiqlFormRedux />
      <hr className="mt-8" />
      <SectionTitle>Response:</SectionTitle>
      <p>
        Status: <span>{status}</span>
      </p>
      <p>Body:</p>
      <pre className="overflow-auto">{data}</pre>
    </div>
  );
};

export default Graphiql;
