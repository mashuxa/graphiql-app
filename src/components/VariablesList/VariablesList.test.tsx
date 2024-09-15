import { Store, UnknownAction } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import { setVariables } from "src/store/variablesSlice";
import { ArgType, replaceUrlData } from "src/utils/headersUtils";
import VariablesList from "./VariablesList";

jest.mock("src/utils/headersUtils", () => ({
  ...jest.requireActual("src/utils/headersUtils"),
  replaceUrlData: jest.fn(),
}));

const mockStore = configureMockStore();
const initialState = {
  body: { body: "test body" },
  variables: { variables: [{ key: "testKey", value: "testValue", id: "1" }] },
};

describe("VariablesList", () => {
  let store:
    | MockStoreEnhanced<unknown, object>
    | Store<unknown, UnknownAction, unknown>;

  beforeEach(() => {
    store = mockStore(initialState);
    store.dispatch = jest.fn();
  });

  it("should render the VariablesList component", () => {
    render(
      <Provider store={store}>
        <VariablesList />
      </Provider>,
    );

    expect(screen.getByText("Variables")).toBeInTheDocument();
    expect(screen.getByDisplayValue("testKey")).toBeInTheDocument();
    expect(screen.getByDisplayValue("testValue")).toBeInTheDocument();
  });

  it("should add a new variable when the add button is clicked", () => {
    render(
      <Provider store={store}>
        <VariablesList />
      </Provider>,
    );

    fireEvent.click(screen.getByText("+"));

    expect(store.dispatch).toHaveBeenCalledWith(
      setVariables([
        ...initialState.variables.variables,
        expect.objectContaining({ key: "", value: "", id: expect.any(String) }),
      ]),
    );
  });

  it("should remove a variable when the remove button is clicked", () => {
    render(
      <Provider store={store}>
        <VariablesList />
      </Provider>,
    );

    fireEvent.click(screen.getByTestId("removeHeaderButton"));

    expect(store.dispatch).toHaveBeenCalledWith(setVariables([]));
  });

  it("should update a variable when the input value is changed", () => {
    render(
      <Provider store={store}>
        <VariablesList />
      </Provider>,
    );

    fireEvent.change(screen.getByDisplayValue("testKey"), {
      target: { value: "newKey" },
    });

    expect(store.dispatch).toHaveBeenCalledWith(
      setVariables([{ key: "newKey", value: "testValue", id: "1" }]),
    );
  });

  it("should call replaceUrlData when an input loses focus", () => {
    render(
      <Provider store={store}>
        <VariablesList />
      </Provider>,
    );

    fireEvent.blur(screen.getByDisplayValue("testKey"));

    expect(replaceUrlData).toHaveBeenCalledWith(
      ArgType.body,
      "test body",
      initialState.variables.variables,
    );
  });
});
