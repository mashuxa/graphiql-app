import { act } from "react";
import { Provider } from "react-redux";
import { makeStore } from "src/store/store";
import { URL } from "src/test/sharedData";
import { fireEvent, render, screen, waitFor } from "src/test/test-utils";
import RestForm from "./RestForm";

const REST_INVALID_REQUEST_BODY = "'''''";
const EXPECTED_ERROR_MESSAGE =
  "Invalid rest format. Please correct the syntax.";

it("If body is not valid apropriate message is shown", async () => {
  const mockStore = makeStore();

  render(
    <Provider store={mockStore}>
      <RestForm />
    </Provider>,
  );
  const urlInput = await waitFor(() => screen.getByTestId("rest-url-input"));

  expect(urlInput).toBeInTheDocument();
  fireEvent.change(urlInput, { target: { value: URL } });

  const bodyTeaxtArea = await waitFor(() =>
    screen.getByTestId("graphiql-body"),
  );

  expect(bodyTeaxtArea).toBeInTheDocument();
  fireEvent.change(bodyTeaxtArea, {
    target: { value: REST_INVALID_REQUEST_BODY },
  });

  bodyTeaxtArea.blur();
  const bodyErrorsArea = await waitFor(() => screen.getByTestId("body-errors"));

  const sendButton = await waitFor(() => screen.getByTestId("rest-send"));

  await act(async () => {
    fireEvent.click(sendButton);
  });

  expect(bodyErrorsArea.textContent).toContain(EXPECTED_ERROR_MESSAGE);
});
