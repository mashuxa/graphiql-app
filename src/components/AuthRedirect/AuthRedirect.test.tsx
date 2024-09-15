import { render } from "src/test/test-utils";
import AuthRedirect from "./AuthRedirect";

jest.mock("src/hooks/useAuthRedirect/useAuthRedirect", () => jest.fn());

describe("AuthRedirect Component", () => {
  test("should be empty component", () => {
    render(<AuthRedirect />);

    const { container } = render(<AuthRedirect />);

    expect(container.firstChild).toBeNull();
  });
});
