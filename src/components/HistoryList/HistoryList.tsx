"use client";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { HistoryItem } from "src/types";
import { decodeUrl, getHistory } from "src/utils/utils";
import { addNotFetchQueryParam } from "./HistroryList.helper";

const HistoryList: FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(getHistory());
    localStorage.removeItem("documentExplorerData");
    localStorage.removeItem("isShowDocumentExplorer");
  }, []);

  return (
    <div className="flex">
      <div className="flex-grow pr-6">
        {history.map((historyItem, index) => {
          const decodedUrl = decodeUrl(historyItem.url);

          return (
            <div key={index}>
              <Link
                className="text-blue-500 underline"
                href={addNotFetchQueryParam(historyItem.url)}
              >
                {decodedUrl}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryList;
