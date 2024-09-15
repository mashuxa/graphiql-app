import { Header } from "src/components/HeadersList/types";
import { encodeToBase64 } from "src/utils/utils";
import {
  ArgType,
  getUrlData,
  getUrlHeadersFromSearchParams,
  getUrlSearchParams,
  makeSearchParams,
  newItem,
  replaceBodyVariables,
  replaceUrlData,
  updateUrlHeaders,
} from "./headersUtils";

describe("headersUtils", () => {
  describe("makeSearchParams", () => {
    it("should create a query string from search params", () => {
      const params = [
        { key: "param1", value: "value1" },
        { key: "param2", value: "value2" },
      ];
      const result = makeSearchParams(params);

      expect(result).toBe("param1=value1&param2=value2");
    });
  });

  describe("newItem", () => {
    it("should create a new Header item with a unique id", () => {
      const key = "Authorization";
      const value = "Bearer token";
      const item = newItem(key, value);

      expect(item).toEqual({
        key,
        value,
        id: expect.any(String),
      });
    });
  });

  describe("getUrlSearchParams", () => {
    it("should return URLSearchParams from the current window location", () => {
      const searchParams = "?param1=value1&param2=value2";

      window.history.replaceState(null, "", searchParams);
      const result = getUrlSearchParams();

      expect(result.toString()).toBe("param1=value1&param2=value2");
    });
  });

  describe("getUrlHeadersFromSearchParams", () => {
    it("should return an array of Header items from URL search params", () => {
      const searchParams = "?param1=value1&param2=value2";

      window.history.replaceState(null, "", searchParams);
      const result = getUrlHeadersFromSearchParams();

      expect(result).toEqual([
        { key: "param1", value: "value1", id: expect.any(String) },
        { key: "param2", value: "value2", id: expect.any(String) },
      ]);
    });
  });

  describe("updateUrlHeaders", () => {
    it("should update the URL with the given headers", () => {
      const headers: Header[] = [
        { key: "param1", value: "value1", id: "1" },
        { key: "param2", value: "value2", id: "2" },
      ];

      updateUrlHeaders(headers);
      expect(window.location.search).toBe("?param1=value1&param2=value2");
    });
  });

  describe("getUrlData", () => {
    it("should return UrlData from the current window location", () => {
      const locale = "en";
      const method = "GET";
      const url = "http://example.com";
      const body = "body content";
      const encodedUrl = encodeToBase64(url);
      const encodedBody = encodeToBase64(body);

      window.history.replaceState(
        null,
        "",
        `/${locale}/${method}/${encodedUrl}/${encodedBody}`,
      );
      const result = getUrlData();

      expect(result).toEqual({
        locale,
        method,
        url,
        body,
      });
    });
  });

  describe("replaceBodyVariables", () => {
    it("should replace variables in the body with their values", () => {
      const body = "Hello, {{name}}!";
      const variables: Header[] = [{ key: "name", value: "World", id: "1" }];
      const result = replaceBodyVariables(body, variables);

      expect(result).toBe("Hello, World!");
    });
  });

  describe("replaceUrlData", () => {
    it("should replace the URL data based on the given type and value", () => {
      const locale = "en";
      const method = "GET";
      const url = "http://example.com";
      const body = "body content";
      const encodedUrl = encodeToBase64(url);
      const encodedBody = encodeToBase64(body);

      window.history.replaceState(
        null,
        "",
        `/${locale}/${method}/${encodedUrl}/${encodedBody}`,
      );

      replaceUrlData(ArgType.url, "http://new-url.com");
      const newUrl = encodeToBase64("http://new-url.com");

      expect(window.location.pathname).toContain(
        `/${locale}/${method}/${newUrl}/${encodedBody}`,
      );
    });
  });
});
