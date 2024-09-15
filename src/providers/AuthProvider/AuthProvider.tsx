"use client";

import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { auth, fetchUserData } from "src/firebase/auth/auth";
import { User } from "src/types";

interface AuthContext {
  user: User | null;
  loading: boolean;
  error?: Error;
}

const DEFAULT_CONTEXT: AuthContext = {
  user: null,
  loading: false,
};

export const AuthContext = createContext<AuthContext>(DEFAULT_CONTEXT);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserData = async (uid?: string): Promise<void> => {
    if (uid) {
      const data = await fetchUserData(uid);

      if (data) {
        setUser(data);
      }
    } else {
      setUser(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      void getUserData(user?.uid);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
