import { NextPage } from "next";

import HistoryList from "src/components/HistoryList/HistoryList";

const History: NextPage = () => {
  //  const t = useTranslations("History");

  return (
    <div data-testid="history-main">
      <HistoryList />
    </div>
  );
};

export default History;
