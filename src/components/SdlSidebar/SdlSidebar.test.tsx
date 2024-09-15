import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react";
import { fetchGraphqlSchema } from "src/fetch/fetchGraphqlSchema";
import { useNotification } from "src/providers/NotificationProvider/NotificationProvider";
import { NotificationType } from "src/providers/NotificationProvider/types";
import { IntlProvider } from "src/test/test-utils";
import SdlSidebar from "./SdlSidebar";

jest.mock("src/fetch/fetchGraphqlSchema");

jest.mock("src/providers/NotificationProvider/NotificationProvider", () => ({
  useNotification: jest.fn(),
}));

describe("SdlSidebar Component", () => {
  const value = "https://test.com";
  const renderComponent = async (): Promise<void> => {
    render(
      <IntlProvider>
        <SdlSidebar />
      </IntlProvider>,
    );

    const input = screen.getByTestId("sdl-input");
    const button = screen.getByTestId("sdl-btn");

    await act(async () => {
      fireEvent.change(input, { target: { value } });
      fireEvent.click(button);
    });
  };
  const mockShowNotification = jest.fn();

  beforeEach(() => {
    (useNotification as jest.Mock).mockReturnValue({
      showNotification: mockShowNotification,
    });
  });

  test("should fetch data on submit form", async () => {
    const mockFetchGraphqlSchema = fetchGraphqlSchema as jest.Mock;

    mockFetchGraphqlSchema.mockResolvedValueOnce({ schema: "Mocked schema" });

    await renderComponent();

    await waitFor(() => {
      expect(mockFetchGraphqlSchema).toHaveBeenCalledWith(value);
    });
  });

  test("should show error notification on failed fetch", async () => {
    const mockFetchGraphqlSchema = fetchGraphqlSchema as jest.Mock;

    mockFetchGraphqlSchema.mockRejectedValueOnce(new Error());

    await renderComponent();

    await waitFor(() => {
      expect(mockShowNotification).toHaveBeenCalledWith(
        NotificationType.Error,
        "Error",
        "Unable to load SDL schema",
      );
    });
  });
});
