"use client";

import { NextPage } from "next";
import { useTranslations } from "next-intl";
import GraphiqlForm from "src/components/GraphiqlForm/GraphiqlForm";
import H1Title from "src/components/H1Title/H1Title";

const Graphiql: NextPage = () => {
  const t = useTranslations("GraphiQL");

  return (
    <>
      <H1Title>{t("title")}</H1Title>
      <GraphiqlForm />
    </>
  );
};

export default Graphiql;
