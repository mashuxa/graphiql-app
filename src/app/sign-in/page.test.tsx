import { render, screen } from "@testing-library/react";

import SignIn from "./page";

describe("RestC lient", () => {
  test("should render page", () => {
    render(<SignIn />);

    const logo = screen.getByTestId("sign-in-main");

    expect(logo).toBeInTheDocument();
  });
});
