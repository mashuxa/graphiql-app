import { Locale } from "src/i18n.config";
import { render, screen } from "src/test/test-utils";
import HomePage from "./page";

describe("Home Page", () => {
  test("should render main", () => {
    render(<HomePage params={{ locale: Locale.EN }} />);

    const logo = screen.getByTestId("root-main");

    expect(logo).toBeInTheDocument();
  });
});
