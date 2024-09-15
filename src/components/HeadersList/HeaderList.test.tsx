import { Store, UnknownAction } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import { ContentType } from "src/types";
import {
  getUrlHeadersFromSearchParams,
  newItem,
  updateUrlHeaders,
} from "src/utils/headersUtils";
import HeadersList from "./HeadersList";

jest.mock("src/utils/headersUtils", () => ({
  ...jest.requireActual("src/utils/headersUtils"),
  getUrlHeadersFromSearchParams: jest.fn(),
  newItem: jest.fn(),
  updateUrlHeaders: jest.fn(),
}));

const mockStore = configureMockStore();
const initialState = {
  method: { method: "GET" },
  contentType: { contentType: "json" },
};

describe("HeadersList", () => {
  let store:
    | MockStoreEnhanced<unknown, object>
    | Store<unknown, UnknownAction, unknown>;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
    (getUrlHeadersFromSearchParams as jest.Mock).mockReturnValue([]);
    (newItem as jest.Mock).mockReturnValue({ key: "", value: "", id: "1" });
  });

  it("should render the HeadersList component", () => {
    render(
      <Provider store={store}>
        <HeadersList />
      </Provider>,
    );

    expect(screen.getByText("Headers")).toBeInTheDocument();
  });

  it("should add a new header when the add button is clicked", () => {
    render(
      <Provider store={store}>
        <HeadersList />
      </Provider>,
    );

    fireEvent.click(screen.getByText("+"));

    expect(screen.getAllByRole("textbox").length).toBe(2); // One for key and one for value
  });

  it("should remove a header when the remove button is clicked", () => {
    (getUrlHeadersFromSearchParams as jest.Mock).mockReturnValue([
      { key: "testKey", value: "testValue", id: "1" },
    ]);

    render(
      <Provider store={store}>
        <HeadersList />
      </Provider>,
    );

    fireEvent.click(screen.getByRole("button", { name: /✖/i }));

    expect(screen.queryByDisplayValue("testKey")).not.toBeInTheDocument();
  });

  it("should update a header when the input value is changed", () => {
    (getUrlHeadersFromSearchParams as jest.Mock).mockReturnValue([
      { key: "testKey", value: "testValue", id: "1" },
    ]);

    render(
      <Provider store={store}>
        <HeadersList />
      </Provider>,
    );

    fireEvent.change(screen.getByDisplayValue("testKey"), {
      target: { value: "newKey" },
    });

    expect(screen.getByDisplayValue("newKey")).toBeInTheDocument();
  });

  it("should update URL headers when headers state changes", () => {
    render(
      <Provider store={store}>
        <HeadersList />
      </Provider>,
    );

    fireEvent.click(screen.getByText("+"));

    expect(updateUrlHeaders).toHaveBeenCalled();
  });

  it("should remove Content-Type header when method does not require body", () => {
    (getUrlHeadersFromSearchParams as jest.Mock).mockReturnValue([
      { key: "Content-Type", value: ContentType.json, id: "1" },
    ]);

    render(
      <Provider store={store}>
        <HeadersList />
      </Provider>,
    );

    store = mockStore({
      ...initialState,
      method: { method: "GET" },
    });

    expect(
      screen.queryByDisplayValue(ContentType.json),
    ).not.toBeInTheDocument();
  });
});
