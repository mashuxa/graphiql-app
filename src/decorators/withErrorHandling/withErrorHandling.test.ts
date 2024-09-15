import { FirebaseError } from "@firebase/app";
import { Codes } from "src/decorators/withErrorHandling/errorCodes";
import withErrorHandling from "./withErrorHandling";

const mockCallback = jest.fn();

describe("withErrorHandling", () => {
  it("should return result on success callback", async () => {
    mockCallback.mockResolvedValueOnce("test");

    const wrappedFn = withErrorHandling(mockCallback);
    const result = await wrappedFn();

    expect(result).toBe("test");
  });

  it("should throw default error code on unexpected fail", async () => {
    mockCallback.mockRejectedValueOnce(new Error("Unexpected error"));

    const wrappedFn = withErrorHandling(mockCallback);

    await expect(wrappedFn()).rejects.toEqual("default");
  });

  it("should throw firebase error code on firebase error", async () => {
    mockCallback.mockRejectedValueOnce(new FirebaseError("test", "Title"));

    const wrappedFn = withErrorHandling(mockCallback);

    await expect(wrappedFn()).rejects.toEqual("test");
  });

  it("should throw custom error code on expected error", async () => {
    mockCallback.mockRejectedValueOnce(Codes.userNotFound);

    const wrappedFn = withErrorHandling(mockCallback);

    await expect(wrappedFn()).rejects.toEqual(Codes.userNotFound);
  });
});
