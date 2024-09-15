import { render, screen } from "src/test/test-utils";
import Preloader from "./Preloader";

describe("Preloader Component", () => {
  test("should render component", () => {
    render(<Preloader />);

    const preloader = screen.getByTestId("preloader");

    expect(preloader).toBeInTheDocument();
  });
});
