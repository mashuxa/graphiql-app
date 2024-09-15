import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { makeStore } from "src/store/store";
import HistoryList from "./HistoryList";

// const EXPECTED_URL = "http://en/GRAPHQL/https://countries.trevorblades.com";

const EMPTY_URL_MESSAGE =
  "You haven't executed any requests yet. It's empty here. Try those options:";

describe("History List", () => {
  // it("Listory list renders the relevant details", async () => {
  //   const mockStore = makeStore();

  //   localStorage.setItem("History", JSON.stringify([MOCK_HISTORY_ITEM]));
  //   render(
  //     <Provider store={mockStore}>
  //       <HistoryList />
  //     </Provider>,
  //   );
  //   const url = await waitFor(() => screen.getByTestId("history-list"));

  //   expect(url.textContent).toEqual(EXPECTED_URL);
  // });

  it("If no history items apropriate message is shown", async () => {
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
