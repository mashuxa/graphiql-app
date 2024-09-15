import { render, screen } from "@testing-library/react";
import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";
import { FC, ReactNode } from "react";
import Rest from "./page";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

jest.mock("src/components/RestForm/RestForm", () => {
  const MockRestForm: FC<{ children?: ReactNode }> = ({ children }) => (
    <div>{children || "RestForm"}</div>
  );

  return MockRestForm;
});
jest.mock("src/components/H1Title/H1Title", () => {
  const MockH1Title: FC<{ children: ReactNode }> = ({ children }) => (
    <h1>{children}</h1>
  );

  return MockH1Title;
});

describe("Rest Page", () => {
  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
  });

  it("should render the Rest page with title and form", () => {
    const params = { method: "GET" };

    render(<Rest params={params} />);

    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("RestForm")).toBeInTheDocument();
  });

  it("should call notFound if method is not in httpMethodList", () => {
    const params = { method: "INVALID_METHOD" };

    render(<Rest params={params} />);

    expect(notFound).toHaveBeenCalled();
  });

  it("should not call notFound if method is in httpMethodList", () => {
    const params = { method: "GET" };

    render(<Rest params={params} />);

    expect(notFound).not.toHaveBeenCalled();
  });
});
