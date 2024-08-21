import { render, screen } from "@testing-library/react";

import SignOut from "./page";

describe("RestC lient", () => {
  test("should render page", () => {
    render(<SignOut />);

    const logo = screen.getByTestId("sign-out-main");

    expect(logo).toBeInTheDocument();
  });
});
