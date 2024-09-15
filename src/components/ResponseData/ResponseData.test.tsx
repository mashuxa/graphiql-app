import { render, screen } from "@testing-library/react";
import ResponseData from "./ResponseData";

jest.mock("src/components/SectionTitle/SectionTitle", () => ({
  __esModule: true,
  default: jest.fn(({ children }) => <h2>{children}</h2>),
}));

describe("ResponseData", () => {
  it("should render the ResponseData component with status and data", () => {
    const status = 200;
    const data = '{"message": "Success"}';

    render(<ResponseData status={status} data={data} />);

    expect(screen.getByText("Response:")).toBeInTheDocument();
    expect(screen.getByText(`${status}`)).toBeInTheDocument();
    expect(screen.getByText("Body:")).toBeInTheDocument();
    expect(screen.getByText(data)).toBeInTheDocument();
  });

  it("should render the correct status", () => {
    const status = 200;
    const data = '{"data": "data"}';

    render(<ResponseData status={status} data={data} />);

    expect(screen.getByText(`${status}`)).toBeInTheDocument();
  });

  it("should render the correct data", () => {
    const status = 200;
    const data = '{"data": "data"}';

    render(<ResponseData status={status} data={data} />);

    expect(screen.getByText(data)).toBeInTheDocument();
  });
});
