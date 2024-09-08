import { NextPage } from "next";
import { useTranslations } from "next-intl";

const GraphiQL: NextPage = () => {
  const t = useTranslations("GraphiQL");

  return <div data-testid="graph-main">{t("title")}</div>;
};

export default GraphiQL;
