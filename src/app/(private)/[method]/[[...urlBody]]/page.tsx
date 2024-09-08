"use server";

import { NextPage } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import RestForm from "src/components/RestForm/RestForm";
import SectionTitle from "src/components/SectionTitle/SectionTitle";
import { fetchRestData } from "src/fetch/fetchRestData";

const Rest: NextPage<{
  params: Params;
  searchParams: Record<string, string>;
}> = async ({ params, searchParams }) => {
  const { status, data } = await fetchRestData(params, searchParams);

  return (
    <div data-testid="rest-main" className="w-full max-w-screen-xl px-4 py-8">
      <h1 className="text-2xl pb-4">Rest Client</h1>
      <RestForm />
      <hr className="mt-8" />
      <SectionTitle>Response:</SectionTitle>
      <p>
        Status: <span>{status}</span>
      </p>
      <p>Body:</p>
      <pre>{data}</pre>
    </div>
  );
};

export default Rest;
