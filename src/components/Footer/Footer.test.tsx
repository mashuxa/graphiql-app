import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  test("should render footer with correct text", () => {
    render(<Footer />);

    const footerElement = screen.getByTestId("footer");

    expect(footerElement).toBeInTheDocument();
  });
});
