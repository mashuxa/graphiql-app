import { NextRequest } from "next/server";
import { HttpMethod } from "src/types";
import { decodeFromBase64 } from "src/utils/utils";
import { handleFetch } from "./handleFetch";

jest.mock("src/utils/utils", () => ({
  decodeFromBase64: jest.fn(),
}));

global.fetch = jest.fn();

describe("handleFetch", () => {
  const mockRequest = (searchParams: Record<string, string>): NextRequest => {
    const url = new URL("http://localhost");

    Object.entries(searchParams).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    return {
      nextUrl: url,
    } as unknown as NextRequest;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if method is not provided", async () => {
    const request = mockRequest({});

    await expect(
      // @ts-expect-error testing invalid params
      handleFetch(request, [null, "urlBase64", "bodyBase64"], false),
    ).rejects.toThrow("Method is required");
  });

  it("should throw an error if URL is not provided", async () => {
    const request = mockRequest({});

    await expect(
      // @ts-expect-error testing invalid params
      handleFetch(request, [HttpMethod.get, null, "bodyBase64"], false),
    ).rejects.toThrow("URL is required");
  });

  it("should handle fetch errors", async () => {
    const request = mockRequest({});

    (decodeFromBase64 as jest.Mock).mockImplementation((str) => str);
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Fetch error"));

    await expect(
      handleFetch(request, [HttpMethod.get, "urlBase64", "bodyBase64"], false),
    ).rejects.toThrow("Connection error");
  });
});
