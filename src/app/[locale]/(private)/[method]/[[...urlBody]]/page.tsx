"use server";

import { NextPage } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";
import H1Title from "src/components/H1Title/H1Title";
import { isFetchData } from "src/components/HistoryList/HistroryList.helper";
import RestForm from "src/components/RestForm/RestForm";
import SectionTitle from "src/components/SectionTitle/SectionTitle";
import { fetchRestData } from "src/fetch/fetchRestData";
import { httpMethodList } from "src/types";

const Rest: NextPage<{
  params: Params;
  searchParams: Record<string, string>;
}> = async ({ params, searchParams }) => {
  if (!httpMethodList.includes(params.method)) {
    notFound();
  }
  let status: number | undefined;
  let data: string;

  if (isFetchData(searchParams)) {
    ({ status, data } = await fetchRestData(params, searchParams));
  } else {
    data = "";
    status = undefined;
  }

  return (
    <div data-testid="rest-main" className="w-full max-w-screen-xl px-4 py-8">
      <H1Title />
      <RestForm />
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

export default Rest;
