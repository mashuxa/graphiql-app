import { render, screen } from "src/test/test-utils";

import GraphiqlClient from "src/app/[locale]/(private)/graphiql-client/page";

describe("GraphiQL Client", () => {
  test("should render page", () => {
    render(<GraphiqlClient />);

    const logo = screen.getByTestId("graph-main");

    expect(logo).toBeInTheDocument();
  });
});
