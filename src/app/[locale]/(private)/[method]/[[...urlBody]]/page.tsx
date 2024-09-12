"use server";

import { NextPage } from "next";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";
import H1Title from "src/components/H1Title/H1Title";
import RestForm from "src/components/RestForm/RestForm";
import { httpMethodList } from "src/types";

const Rest: NextPage<{
  params: Params;
  searchParams: Record<string, string>;
}> = async ({ params }) => {
  if (!httpMethodList.includes(params.method)) {
    notFound();
  }

  return (
    <div data-testid="rest-main" className="w-full max-w-screen-xl px-4 py-8">
      <H1Title />
      <RestForm />
      <hr className="mt-8" />
    </div>
  );
};

export default Rest;
