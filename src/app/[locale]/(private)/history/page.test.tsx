// import { render, screen } from "@testing-library/react";
import { render, screen } from "../../../../../test/test-utils";

import History from "src/app/[locale]/(private)/history/page";

describe("History", () => {
  test("should render page", () => {
    render(<History />);

    const logo = screen.getByTestId("history-main");

    expect(logo).toBeInTheDocument();
  });
});
