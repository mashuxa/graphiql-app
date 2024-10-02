import { NextPage } from "next";
import { useTranslations } from "next-intl";
import H1Title from "src/components/H1Title/H1Title";
import HistoryList from "src/components/HistoryList/HistoryList";

const History: NextPage = () => {
  const t = useTranslations("History");

  return (
    <div data-testid="history-main">
      <H1Title>{t("title")}</H1Title>
      <HistoryList />
    </div>
  );
};

export default History;
