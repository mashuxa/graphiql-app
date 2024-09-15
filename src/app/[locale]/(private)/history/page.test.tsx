import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { NotificationProvider } from "src/providers/NotificationProvider/NotificationProvider";
import { makeStore } from "src/store/store";
import History from "./page";

jest.mock("src/components/HistoryList/HistoryList", () => {
  const MockHistoryList: React.FC = () => <div>HistoryList</div>;

  return MockHistoryList;
});

describe("History Page", () => {
  it("should render the History page with HistoryList component", () => {
    const mockStore = makeStore();

    render(
      <NotificationProvider>
        <Provider store={mockStore}>
          <History />
        </Provider>
      </NotificationProvider>,
    );

    expect(screen.getByTestId("history-main")).toBeInTheDocument();
    expect(screen.getByText("HistoryList")).toBeInTheDocument();
  });
});
