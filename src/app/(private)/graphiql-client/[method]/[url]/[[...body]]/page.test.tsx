import { render, screen } from "@testing-library/react";
import Graphiql from "./page";

describe("Graphiql Client", () => {
  test("should render page", () => {
    render(<Graphiql />);

    const logo = screen.getByTestId("graph-main");

    expect(logo).toBeInTheDocument();
  });
});
