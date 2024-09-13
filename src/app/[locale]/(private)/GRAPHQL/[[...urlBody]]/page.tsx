"use server";

import { NextPage } from "next";
import { useTranslations } from "next-intl";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import GraphiqlForm from "src/components/GraphiqlForm/GraphiqlForm";
import H1Title from "src/components/H1Title/H1Title";
import ResponseData from "src/components/ResponseData/ResponseData";
import { fetchGraphqlData } from "src/fetch/fetchGraphqlData";

const Graphiql: NextPage<{
  params: Params;
  searchParams: Record<string, string>;
}> = async ({ params, searchParams }) => {
  const t = useTranslations("GraphiQL");
  const { status, data } = await fetchGraphqlData(params, searchParams);

  return (
    <>
      <H1Title>{t("title")}</H1Title>
      <GraphiqlForm />
      <ResponseData status={status} data={data} />
    </>
  );
};

export default Graphiql;
