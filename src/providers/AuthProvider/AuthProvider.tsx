"use client";

import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
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
  const [loading, setLoading] = useState(false);
  const [firebaseUserData, firebaseLoading] = useAuthState(auth);

  const getUserData = async (uid: string): Promise<void> => {
    setLoading(true);

    const data = await fetchUserData(uid);

    if (data) {
      setUser(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (firebaseUserData) {
      void getUserData(firebaseUserData.uid);
    } else {
      setUser(null);
    }
  }, [firebaseUserData]);

  return (
    <AuthContext.Provider value={{ user, loading: firebaseLoading || loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
