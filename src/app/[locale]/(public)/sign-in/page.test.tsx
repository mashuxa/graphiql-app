// import { render, screen } from "@testing-library/react";
import { act, render, screen } from "../../../../../test/test-utils";

import SignIn from "src/app/[locale]/(public)/sign-in/page";

describe("Sign In", () => {
  test("should render page", async () => {
    await act(async () => {
      render(<SignIn />);
    });

    const logo = screen.getByTestId("sign-in-main");

    expect(logo).toBeInTheDocument();
  });
});
