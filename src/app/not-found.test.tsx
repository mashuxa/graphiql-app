import { render, screen } from "@testing-library/react";
import NotFound from "./not-found";

jest.mock("next/error", () => {
  return jest.fn(() => <div>Error 404</div>);
});

describe("NotFound", () => {
  it("should render the NotFound component with 404 error", () => {
    render(<NotFound />);

    expect(screen.getByText("Error 404")).toBeInTheDocument();
  });

  it("should have html and body tags", () => {
    render(<NotFound />);

    expect(document.querySelector("html")).toBeInTheDocument();
    expect(document.querySelector("body")).toBeInTheDocument();
  });
});
