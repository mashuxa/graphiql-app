import { NextPage } from "next";

import { useTranslations } from "next-intl";

const RestClient: NextPage = () => {
  const t = useTranslations("RestClient");

  return <div data-testid="rest-main">{t("placeholder")}</div>;
};

export default RestClient;
