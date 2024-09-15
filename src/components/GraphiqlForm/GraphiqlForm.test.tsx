import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { makeStore } from "src/store/store";
import GraphiqlForm from "./GraphiqlForm";

const URL = "https://countries.trevorblades.com";

const GRAPHQL_REQUEST_BODY = `query GetCountry {
    country(code: "BR") {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }`;
const EXPECTED_PATHNAME =
  "/en/GRAPHQL/aHR0cHM6Ly9jb3VudHJpZXMudHJldm9yYmxhZGVzLmNvbQ==/";

describe("Graphiql component", () => {
  it("Url in browser is updated after changes url or body", async () => {
    const mockStore = makeStore();

    render(
      <Provider store={mockStore}>
        <GraphiqlForm />
      </Provider>,
    );
    const urlInput = await waitFor(() =>
      screen.getByTestId("graphiql-url-input"),
    );

    expect(urlInput).toBeInTheDocument();
    fireEvent.change(urlInput, { target: { value: URL } });

    const bodyTeaxtArea = await waitFor(() =>
      screen.getByTestId("graphiql-body"),
    );

    expect(bodyTeaxtArea).toBeInTheDocument();
    fireEvent.change(bodyTeaxtArea, {
      target: { value: GRAPHQL_REQUEST_BODY },
    });

    expect(window.location.pathname).toEqual(EXPECTED_PATHNAME);
  });
});
