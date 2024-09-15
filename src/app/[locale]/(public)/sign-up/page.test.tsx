import SignUp from "src/app/[locale]/(public)/sign-up/page";
import { render, screen } from "src/test/test-utils";

describe("Sign-Up Page", () => {
  test("should render page", () => {
    render(<SignUp />);

    expect(screen.getByTestId("sign-up")).toBeInTheDocument();
  });
});
