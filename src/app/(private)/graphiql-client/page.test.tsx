import { render, screen } from "@testing-library/react";

import GraphiqlClient from "src/app/(private)/graphiql-client/page";

describe("Graphiql Client", () => {
  test("should render page", () => {
    render(<GraphiqlClient />);

    const logo = screen.getByTestId("graph-main");

    expect(logo).toBeInTheDocument();
  });
});
