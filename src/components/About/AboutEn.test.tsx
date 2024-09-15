import { render, screen } from "src/test/test-utils";
import AboutEn from "./AboutEn";

describe("AboutEn Component", () => {
  test("should render component", () => {
    render(<AboutEn />);

    const component = screen.getByTestId("about-en");

    expect(component).toBeInTheDocument();
  });
});
