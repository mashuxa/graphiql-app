import { render, screen } from "../../../test/test-utils";

import LanguageToggle from "./LanguageToggle";

describe("LanguageToggle Component", () => {
  test("should render LanguageToggle with correct text", () => {
    render(<LanguageToggle locale={"en"} />);

    const languageToggleElement = screen.getByTestId("language-toggle");

    expect(languageToggleElement).toBeInTheDocument();
  });
});
