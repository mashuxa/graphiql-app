import SignIn from "src/app/[locale]/(public)/sign-in/page";
import { render, screen } from "src/test/test-utils";

describe("Sign-In Page", () => {
  test("should render page", () => {
    render(<SignIn />);

    expect(screen.getByTestId("sign-in")).toBeInTheDocument();
  });
});
