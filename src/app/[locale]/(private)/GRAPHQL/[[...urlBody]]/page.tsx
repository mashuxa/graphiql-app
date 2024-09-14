"use client";

import { NextPage } from "next";
import { useTranslations } from "next-intl";
import GraphiqlForm from "src/components/GraphiqlForm/GraphiqlForm";
import H1Title from "src/components/H1Title/H1Title";
import SdlSidebar from "src/components/SdlSidebar/SdlSidebar";

const Graphiql: NextPage = () => {
  const t = useTranslations("GraphiQL");

  return (
    <>
      <H1Title>{t("title")}</H1Title>
      <div className="lg:flex">
        <div className="grow pb-8 lg:order-1 overflow-x-auto">
          <GraphiqlForm />
        </div>
        <div className="lg:pr-4">
          <SdlSidebar />
        </div>
      </div>
    </>
  );
};

export default Graphiql;
