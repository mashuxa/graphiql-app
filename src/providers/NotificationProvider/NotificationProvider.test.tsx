import { fireEvent, render, screen } from "@testing-library/react";
import { FC, act } from "react";
import {
  NotificationProvider,
  TIMEOUT_MS,
  useNotification,
} from "src/providers/NotificationProvider/NotificationProvider";
import { NotificationType } from "src/providers/NotificationProvider/types";

const TestComponent: FC<{ autoclose?: boolean }> = ({ autoclose = false }) => {
  const { showNotification } = useNotification();

  return (
    <button
      onClick={() =>
        showNotification(
          NotificationType.Error,
          "title",
          "description",
          autoclose,
        )
      }
      data-testid="test-component"
    >
      test
    </button>
  );
};

describe("NotificationProvider", () => {
  const renderComponent = async (): Promise<void> => {
    await act(async () => {
      render(
        <NotificationProvider>
          <TestComponent />
        </NotificationProvider>,
      );
    });
  };

  it("should render child", async () => {
    await renderComponent();

    expect(screen.getByTestId("test-component")).toBeInTheDocument();
  });

  it("should show notification and hide on close", async () => {
    await renderComponent();

    await act(async () =>
      fireEvent.click(screen.getByTestId("test-component")),
    );

    expect(screen.getByTestId("notification")).toBeInTheDocument();

    await act(async () =>
      fireEvent.click(screen.getByTestId("notification-close")),
    );

    expect(screen.queryByTestId("notification")).not.toBeInTheDocument();
  });

  it("should show notification and auto close notification on timeout", async () => {
    jest.useFakeTimers();

    await act(async () => {
      render(
        <NotificationProvider>
          <TestComponent autoclose={true} />
        </NotificationProvider>,
      );
    });

    await act(async () =>
      fireEvent.click(screen.getByTestId("test-component")),
    );

    expect(screen.getByTestId("notification")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(TIMEOUT_MS);
    });

    expect(screen.queryByTestId("notification")).not.toBeInTheDocument();
  });

  it("should throw error on render without provider", () => {
    expect(() => render(<TestComponent />)).toThrow(
      "NotificationContext Error: useNotification must be used within a NotificationProvider",
    );
  });
});
