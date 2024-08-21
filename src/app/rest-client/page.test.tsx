import { render, screen } from "@testing-library/react";

import RestClient from "./page";

describe("RestC lient", () => {
  test("should render page", () => {
    render(<RestClient />);

    const logo = screen.getByTestId("rest-main");

    expect(logo).toBeInTheDocument();
  });
});
