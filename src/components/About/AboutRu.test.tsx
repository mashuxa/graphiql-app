import { render, screen } from "src/test/test-utils";
import AboutRu from "./AboutRu";

describe("AboutRu Component", () => {
  test("should render component", () => {
    render(<AboutRu />);

    const component = screen.getByTestId("about-ru");

    expect(component).toBeInTheDocument();
  });
});
