import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Router } from "next/router";
import { Provider } from "react-redux";
import { NotificationProvider } from "src/providers/NotificationProvider/NotificationProvider";
import { makeStore } from "src/store/store";
import { MOCK_HISTORY_ITEM } from "../../test/sharedData";
import GraphiqlForm from "../GraphiqlForm/GraphiqlForm";
import RestForm from "../RestForm/RestForm";
import ModalWrapper from "./ModalWrapper";

const mockRouterback = jest.fn();

jest.mock("src/i18n.config", (): { useRouter: () => Partial<Router> } => ({
  useRouter(): Partial<Router> {
    return {
      pathname: "",
      back: mockRouterback,
    };
  },
}));

describe("Modal Wrapper", () => {
  it("Modal wrapper renders graphql form with the relevant details", async () => {
    const mockStore = makeStore();

    localStorage.setItem("History", JSON.stringify([MOCK_HISTORY_ITEM]));
    render(
      <Provider store={mockStore}>
        <NotificationProvider>
          <ModalWrapper>
            <GraphiqlForm />
          </ModalWrapper>
        </NotificationProvider>
      </Provider>,
    );
    const form = await waitFor(() => screen.getByTestId("graphiql-form"));

    expect(form).toBeInTheDocument();
  });

  it("Modal wrapper renders rest form with the relevant details", async () => {
    const mockStore = makeStore();

    localStorage.setItem("History", JSON.stringify([MOCK_HISTORY_ITEM]));
    render(
      <Provider store={mockStore}>
        <NotificationProvider>
          <ModalWrapper>
            <RestForm />
          </ModalWrapper>
        </NotificationProvider>
      </Provider>,
    );

    const form = await waitFor(() => screen.getByTestId("rest-form"));

    expect(form).toBeInTheDocument();
  });

  it("Close Button closes modal", async () => {
    const mockStore = makeStore();

    localStorage.setItem("History", JSON.stringify([MOCK_HISTORY_ITEM]));

    render(
      <Provider store={mockStore}>
        <NotificationProvider>
          <ModalWrapper>
            <RestForm />
          </ModalWrapper>
        </NotificationProvider>
      </Provider>,
    );
    const closeButton = await waitFor(() =>
      screen.getByTestId("modal-wrapper-close-button"),
    );

    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(mockRouterback).toHaveBeenCalled();
  });
});
