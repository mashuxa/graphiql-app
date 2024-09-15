import { render, screen } from "src/test/test-utils";

import LanguageToggle from "./LanguageToggle";

describe("LanguageToggle Component", () => {
  test("should render LanguageToggle with correct text", () => {
    render(<LanguageToggle />);

    const languageToggleElement = screen.getByTestId("language-toggle");

    expect(languageToggleElement).toBeInTheDocument();
  });
});
