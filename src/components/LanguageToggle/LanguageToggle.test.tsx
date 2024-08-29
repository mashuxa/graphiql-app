import { Locale } from "src/i18n.config";
import { render, screen } from "src/test/test-utils";

import LanguageToggle from "./LanguageToggle";

describe("LanguageToggle Component", () => {
  test("should render LanguageToggle with correct text", () => {
    render(<LanguageToggle locale={Locale.EN} />);

    const languageToggleElement = screen.getByTestId("language-toggle");

    expect(languageToggleElement).toBeInTheDocument();
  });
});
