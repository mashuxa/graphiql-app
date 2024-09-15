"use client";

import { NextPage } from "next";
import { useTranslations } from "next-intl";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";
import H1Title from "src/components/H1Title/H1Title";
import RestForm from "src/components/RestForm/RestForm";
import { httpMethodList } from "src/types";

const Rest: NextPage<{ params: Params }> = ({ params }) => {
  const t = useTranslations("RestClient");

  if (!httpMethodList.includes(params.method)) {
    notFound();
  }

  return (
    <>
      <H1Title>{t("title")}</H1Title>
      <RestForm />
    </>
  );
};

export default Rest;
