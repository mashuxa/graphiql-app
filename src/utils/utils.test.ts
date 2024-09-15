import { HistoryItem } from "src/types";
import {
  addHistoryItemToLocalStorage,
  decodeFromBase64,
  decodeUrl,
  encodeToBase64,
  getHistoryFromLocalStorage,
} from "./utils";

describe("utils", () => {
  describe("encodeToBase64", () => {
    it("should encode a string to Base64", () => {
      const str = "Hello, World!";
      const encoded = encodeToBase64(str);

      expect(encoded).toBe(btoa(str));
    });

    it("should return an empty string if input is undefined", () => {
      const encoded = encodeToBase64();

      expect(encoded).toBe("");
    });
  });

  describe("decodeFromBase64", () => {
    it("should decode a Base64 string", () => {
      const str = "Hello, World!";
      const encoded = btoa(str);
      const decoded = decodeFromBase64(encoded);

      expect(decoded).toBe(str);
    });

    it("should return an empty string if input is empty", () => {
      const decoded = decodeFromBase64("");

      expect(decoded).toBe("");
    });
  });

  describe("getHistoryFromLocalStorage", () => {
    it("should return an array of HistoryItem from localStorage", () => {
      const history: HistoryItem[] = [
        { url: "https://github.com", executed: 1 },
      ];

      localStorage.setItem("History", JSON.stringify(history));
      const result = getHistoryFromLocalStorage();

      expect(result).toEqual(history);
    });

    it("should return an empty array if there is no history in localStorage", () => {
      localStorage.removeItem("History");
      const result = getHistoryFromLocalStorage();

      expect(result).toEqual([]);
    });
  });

  describe("addHistoryItemToLocalStorage", () => {
    it("should add a HistoryItem to localStorage", () => {
      const history: HistoryItem[] = [
        { url: "https://github.com/", executed: 1 },
      ];

      localStorage.setItem("History", JSON.stringify(history));
      const newItem: HistoryItem = {
        url: "https://www.npmjs.com/",
        executed: 2,
      };

      addHistoryItemToLocalStorage(newItem);
      const result = getHistoryFromLocalStorage();

      expect(result).toEqual([...history, newItem]);
    });
  });

  describe("decodeUrl", () => {
    it("should decode Base64 segments in the URL", () => {
      const url =
        "http://example.com/segment1/segment2/segment3/" +
        btoa("encodedSegment");
      const decodedUrl = decodeUrl(url);

      expect(decodedUrl).toContain("encodedSegment");
    });

    it("should not decode segments before the third segment", () => {
      const url =
        "http://example.com/segment1/segment2/" + btoa("encodedSegment");
      const decodedUrl = decodeUrl(url);

      expect(decodedUrl).toContain("segment1/segment2");
    });
  });
});
