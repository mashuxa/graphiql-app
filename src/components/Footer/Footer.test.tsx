// import { render, screen } from "@testing-library/react";
import { render, screen } from "../../../test/test-utils";

import Footer from "./Footer";

describe("Footer Component", () => {
  test("should render footer with correct text", async () => {
    render(<Footer />);

    const footerElement = screen.getByTestId("footer");

    expect(footerElement).toBeInTheDocument();
  });
});
