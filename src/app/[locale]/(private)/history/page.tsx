import { NextPage } from "next";

import { useTranslations } from "next-intl";

const History: NextPage = () => {
  const t = useTranslations("History");

  return <div data-testid="history-main">{t("placeholder")}</div>;
};

export default History;
