import { render, screen } from "@testing-library/react";
import NotFound from "./not-found";

describe("NotFound", () => {
  it("should render the NotFound component with 404 error message", () => {
    render(<NotFound />);

    expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByText("The page you are looking for doesn't exist."),
    ).toBeInTheDocument();
  });
});
