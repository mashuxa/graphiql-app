import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Router } from "next/router";
import { FC, PropsWithChildren } from "react";
import { Provider } from "react-redux";
import RestForm from "src/components/RestForm/RestForm";
import { NotificationProvider } from "src/providers/NotificationProvider/NotificationProvider";
import { makeStore } from "src/store/store";
import { MOCK_HISTORY_ITEM } from "src/test/sharedData";
import { IntlProvider } from "src/test/test-utils";
import GraphiqlForm from "../GraphiqlForm/GraphiqlForm";
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

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  const mockStore = makeStore();

  return (
    <Provider store={mockStore}>
      <IntlProvider>
        <NotificationProvider>
          <ModalWrapper>{children}</ModalWrapper>
        </NotificationProvider>
      </IntlProvider>
    </Provider>
  );
};

describe("Modal Wrapper", () => {
  it("Modal wrapper renders graphql form with the relevant details", async () => {
    localStorage.setItem("History", JSON.stringify([MOCK_HISTORY_ITEM]));
    render(
      <Wrapper>
        <GraphiqlForm />
      </Wrapper>,
    );

    const form = await waitFor(() => screen.getByTestId("graphiql-form"));

    expect(form).toBeInTheDocument();
  });

  it("Modal wrapper renders rest form with the relevant details", async () => {
    localStorage.setItem("History", JSON.stringify([MOCK_HISTORY_ITEM]));
    render(
      <Wrapper>
        <RestForm />
      </Wrapper>,
    );
    const form = await waitFor(() => screen.getByTestId("rest-form"));

    expect(form).toBeInTheDocument();
  });

  it("Close Button closes modal", async () => {
    localStorage.setItem("History", JSON.stringify([MOCK_HISTORY_ITEM]));
    render(
      <Wrapper>
        <RestForm />
      </Wrapper>,
    );

    const closeButton = await waitFor(() =>
      screen.getByTestId("modal-wrapper-close-button"),
    );

    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(mockRouterback).toHaveBeenCalled();
  });
});
