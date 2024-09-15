import Reset from "src/app/[locale]/(public)/reset-password/page";
import { render, screen } from "src/test/test-utils";

describe("Reset password Page", () => {
  test("should render page", () => {
    render(<Reset />);

    expect(screen.getByTestId("reset")).toBeInTheDocument();
  });
});
