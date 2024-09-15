import { render, screen } from "@testing-library/react";
import { useTranslations } from "next-intl";
import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { NotificationProvider } from "src/providers/NotificationProvider/NotificationProvider";
import { makeStore } from "src/store/store";
import Graphiql from "./page";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(),
}));

jest.mock("src/components/GraphiqlForm/GraphiqlForm", () => {
  const MockGraphiqlForm: FC<{ children?: ReactNode }> = ({ children }) => (
    <div>{children || "GraphiqlForm"}</div>
  );

  return MockGraphiqlForm;
});
jest.mock("src/components/H1Title/H1Title", () => {
  const MockH1Title: FC<{ children: ReactNode }> = ({ children }) => (
    <h1>{children}</h1>
  );

  return MockH1Title;
});

jest.mock("src/components/SdlSidebar/SdlSidebar", () => {
  const MockSdlSidebar: FC = () => <div>SdlSidebar</div>;

  return MockSdlSidebar;
});

describe("Graphiql Page", () => {
  beforeEach(() => {
    (useTranslations as jest.Mock).mockReturnValue((key: string) => key);
  });

  it("should render the Graphiql page with title, form, and sidebar", () => {
    const mockStore = makeStore();

    render(
      <NotificationProvider>
        <Provider store={mockStore}>
          <Graphiql />
        </Provider>
      </NotificationProvider>,
    );

    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByText("GraphiqlForm")).toBeInTheDocument();
    expect(screen.getByText("SdlSidebar")).toBeInTheDocument();
  });
});
