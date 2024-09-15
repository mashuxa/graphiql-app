import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { makeStore } from "src/store/store";
import { MOCK_HISTORY_ITEM } from "src/test/sharedData";
import { IntlProvider } from "src/test/test-utils";
import HistoryList from "./HistoryList";

const EMPTY_URL_MESSAGE =
  "You haven't executed any requests yet. It's empty here. Try those options:";

describe("History List", () => {
  it("History list renders the relevant details", async () => {
    const mockStore = makeStore();

    localStorage.setItem("History", JSON.stringify([MOCK_HISTORY_ITEM]));
    render(
      <IntlProvider>
        <Provider store={mockStore}>
          <HistoryList />
        </Provider>
      </IntlProvider>,
    );
    const url = await waitFor(() => screen.getByTestId("history-list-item"));

    expect(url).toBeInTheDocument();
  });

  it("If no history items appropriate message is shown", async () => {
    const mockStore = makeStore();

    localStorage.setItem("History", "[]");
    render(
      <Provider store={mockStore}>
        <HistoryList />
      </Provider>,
    );
    const url = await waitFor(() => screen.getByTestId("history-list"));

    expect(url.textContent).toEqual(EMPTY_URL_MESSAGE);
  });
});
