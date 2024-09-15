"use client";

import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "src/constants";
import { Link } from "src/i18n.config";
import { setHistory } from "src/store/historySlice";
import { RootState } from "src/store/store";
import { decodeUrl, getHistoryFromLocalStorage } from "src/utils/utils";
import Navigation from "../Navigation/Navigation";

const HistoryList: FC = () => {
  const history = useSelector((state: RootState) => state.history.history);
  const dispatch = useDispatch();

  const navLinks = [
    { href: routes.restClient, title: "restClient" },
    { href: routes.graphiqlClient, title: "graphiqlClient" },
  ];

  useEffect(() => {
    const historyFromLocalStorage = getHistoryFromLocalStorage();

    dispatch(setHistory({ history: historyFromLocalStorage }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex">
      <div data-testid="history-list" className="flex-grow pr-6">
        {history.length === 0 ? (
          <div className="text-center">
            You haven&apos;t executed any requests yet. It&apos;s empty here.
            Try those options:
            <div className="py-6">
              <Navigation links={navLinks} />
            </div>
          </div>
        ) : null}
        {[...history]
          .sort((a, b) => b.executed - a.executed)
          .map((historyItem, index) => {
            const decodedUrl = decodeUrl(historyItem.url);

            return (
              <div
                data-testid="history-list-item"
                key={index}
                className="my-3 p-2 bg-neutral-100 rounded-md text-blue-500 underline"
              >
                <Link className="" href={historyItem.url}>
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
