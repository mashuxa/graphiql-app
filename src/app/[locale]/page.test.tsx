import { render, screen } from "src/test/test-utils";

import HomePage from "./page";

describe("Home Page", () => {
  test("should render main", () => {
    render(<HomePage />);

    const logo = screen.getByTestId("root-main");

    expect(logo).toBeInTheDocument();
  });
});
