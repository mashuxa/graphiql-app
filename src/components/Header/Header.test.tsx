import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header Component", () => {
  test("should render header with correct text", () => {
    render(<Header />);

    const headerElement = screen.getByTestId("header");

    expect(headerElement).toBeInTheDocument();
  });
});
