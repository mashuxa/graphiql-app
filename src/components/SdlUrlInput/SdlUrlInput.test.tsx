import { fireEvent, render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { getUrlData } from "src/utils/headersUtils";
import SdlUrlInput from "./SdlUrlInput";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("src/utils/headersUtils", () => ({
  getUrlData: jest.fn(),
}));

describe("SdlUrlInput", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/test-path");
    (getUrlData as jest.Mock).mockReturnValue({ url: "http://example.com" });
  });

  it("should render the SdlUrlInput component", () => {
    render(<SdlUrlInput />);

    expect(screen.getByPlaceholderText("Sdl Url")).toBeInTheDocument();
  });

  it("should update the value when input changes", () => {
    render(<SdlUrlInput />);

    const input = screen.getByPlaceholderText("Sdl Url") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "http://new-url.com" } });

    expect(input.value).toBe("http://new-url.com");
  });

  it("should set the initial value based on getUrlData", () => {
    render(<SdlUrlInput />);

    const input = screen.getByPlaceholderText("Sdl Url") as HTMLInputElement;

    expect(input.value).toBe("http://example.com?sdl");
  });

  it("should update the value when pathname changes", () => {
    const { rerender } = render(<SdlUrlInput />);

    (usePathname as jest.Mock).mockReturnValue("/new-path");
    (getUrlData as jest.Mock).mockReturnValue({
      url: "http://new-example.com",
    });

    rerender(<SdlUrlInput />);

    const input = screen.getByPlaceholderText("Sdl Url") as HTMLInputElement;

    expect(input.value).toBe("http://new-example.com?sdl");
  });
});
