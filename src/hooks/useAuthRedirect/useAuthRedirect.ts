import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthContext } from "src/providers/AuthProvider/AuthProvider";

const useAuthRedirect = (onAuthenticated: boolean, route: string): void => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const isAuthenticated = !!user;
  const shouldRedirect = !loading && isAuthenticated === onAuthenticated;

  useEffect(() => {
    if (shouldRedirect) {
      router.push(route);
    }
  }, [route, router, shouldRedirect]);
};

export default useAuthRedirect;
