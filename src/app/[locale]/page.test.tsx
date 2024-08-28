import { render, screen } from "../../../test/test-utils";

import HomePage from "./page";

describe("Home Page", () => {
  test("should render main", () => {
    render(<HomePage />);

    const logo = screen.getByTestId("root-main");

    expect(logo).toBeInTheDocument();
  });
});
