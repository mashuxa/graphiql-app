import { render, screen } from "@testing-library/react";
import { useTranslations } from "next-intl";
import History from "./page";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

jest.mock("src/components/HistoryList/HistoryList", () => {
  const MockHistoryList: React.FC = () => <div>HistoryList</div>;

  return MockHistoryList;
});

describe("History Page", () => {
  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
  });

  it("should render the History page with HistoryList component", () => {
    render(<History />);

    expect(screen.getByTestId("history-main")).toBeInTheDocument();
    expect(screen.getByText("HistoryList")).toBeInTheDocument();
  });
});
