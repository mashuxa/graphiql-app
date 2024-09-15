import Layout from "src/app/[locale]/(public)/layout";
import { render, screen } from "src/test/test-utils";

describe("Public Layout", () => {
  test("should render page", () => {
    render(<Layout />);

    expect(screen.getByTestId("public-layout")).toBeInTheDocument();
  });
});
