import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { Router } from "next/router";
import { Provider } from "react-redux";
import { NotificationProvider } from "src/providers/NotificationProvider/NotificationProvider";
import { makeStore } from "src/store/store";
import { URL } from "src/test/sharedData";
import { render } from "src/test/test-utils";
import GraphiqlForm from "./GraphiqlForm";

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

const GRAPHQL_INVALID_REQUEST_BODY = "";

const EXPECTED_PATHNAME =
  "/en/GRAPHQL/aHR0cHM6Ly9jb3VudHJpZXMudHJldm9yYmxhZGVzLmNvbQ==/cXVlcnkgR2V0Q291bnRyeSB7CiAgICBjb3VudHJ5KGNvZGU6ICJCUiIpIHsKICAgICAgbmFtZQogICAgICBuYXRpdmUKICAgICAgY2FwaXRhbAogICAgICBlbW9qaQogICAgICBjdXJyZW5jeQogICAgICBsYW5ndWFnZXMgewogICAgICAgIGNvZGUKICAgICAgICBuYW1lCiAgICAgIH0KICAgIH0KICB9";

const EXPECTED_ERROR_MESSAGE =
  "Invalid graphql format. Please correct the syntax.";

jest.mock("next/navigation", (): { useRouter: () => Partial<Router> } => ({
  useRouter(): Partial<Router> {
    return {
      pathname: "",
    };
  },
}));

describe("Graphiql component", () => {
  it("Url in browser is updated after changes url or body", async () => {
    const mockStore = makeStore();

    render(
      <NotificationProvider>
        <Provider store={mockStore}>
          <GraphiqlForm />
        </Provider>
      </NotificationProvider>,
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

    fireEvent.blur(bodyTeaxtArea);

    expect(window.location.pathname).toEqual(EXPECTED_PATHNAME);
  });

  it("If body is not valid apropriate message is shown", async () => {
    const mockStore = makeStore();

    render(
      <NotificationProvider>
        <Provider store={mockStore}>
          <GraphiqlForm />
        </Provider>
      </NotificationProvider>,
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
      target: { value: GRAPHQL_INVALID_REQUEST_BODY },
    });

    bodyTeaxtArea.blur();
    const bodyErrorsArea = await waitFor(() =>
      screen.getByTestId("body-errors"),
    );

    expect(bodyErrorsArea.textContent).toContain(EXPECTED_ERROR_MESSAGE);
  });
});
it("On submit validation is run", async () => {
  const mockStore = makeStore();

  act(() => {
    render(
      <Provider store={mockStore}>
        <GraphiqlForm />
      </Provider>,
    );
  });
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
    target: { value: GRAPHQL_INVALID_REQUEST_BODY },
  });

  bodyTeaxtArea.blur();
  const sendButton = await waitFor(() => screen.getByTestId("graphiql-send"));

  await act(async () => {
    fireEvent.click(sendButton);
  });
});
