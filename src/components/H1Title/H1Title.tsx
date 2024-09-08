"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";

const H1Title: FC = () => {
  const t = useTranslations("RestClient");

  return <h1 className="text-2xl pb-4">{t("placeholder")}</h1>;
};

export default H1Title;
