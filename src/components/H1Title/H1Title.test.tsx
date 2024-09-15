import { render, screen } from "src/test/test-utils";
import H1Title from "./H1Title";

describe("H1Title Component", () => {
  test("should render component", () => {
    render(<H1Title />);

    const title = screen.getByTestId("h1-title");

    expect(title).toBeInTheDocument();
  });
});
