import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("Home Page", () => {
  test("should render logo", () => {
    render(<HomePage />);

    const logo = screen.getByTestId("logo-link");

    expect(logo).toBeInTheDocument();
  });
});
