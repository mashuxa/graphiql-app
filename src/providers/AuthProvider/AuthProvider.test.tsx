import { render, screen } from "@testing-library/react";
import { FC, act, useContext } from "react";
import { auth, fetchUserData } from "src/firebase/auth/auth";
import AuthProvider, {
  AuthContext,
} from "src/providers/AuthProvider/AuthProvider";

const TestComponent: FC = () => {
  const { user } = useContext(AuthContext);

  return <div data-testid="test-component">{user?.name}</div>;
};

describe("AuthProvider", () => {
  const renderComponent = async (): Promise<void> => {
    await act(async () => {
      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>,
      );
    });
  };

  it("should render child", async () => {
    (auth.onAuthStateChanged as jest.Mock).mockImplementation((callback) => {
      callback(null);
    });

    await renderComponent();

    expect(screen.getByTestId("test-component")).toBeInTheDocument();
  });

  it("should provide user data on success user fetch", async () => {
    (auth.onAuthStateChanged as jest.Mock).mockImplementation((callback) => {
      callback({ uid: "uid" });

      return jest.fn();
    });
    (fetchUserData as jest.Mock).mockResolvedValue({
      uid: "uid",
      name: "test",
    });

    await renderComponent();

    expect(screen.getByTestId("test-component")).toHaveTextContent("test");
  });
});
