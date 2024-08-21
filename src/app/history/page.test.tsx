import { render, screen } from "@testing-library/react";

import History from "./page";

describe("History", () => {
  test("should render page", () => {
    render(<History />);

    const logo = screen.getByTestId("history-main");

    expect(logo).toBeInTheDocument();
  });
});
