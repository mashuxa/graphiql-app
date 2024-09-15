import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@firebase/auth";

import withErrorHandling from "src/decorators/withErrorHandling/withErrorHandling";
import { createUser, findUserById } from "src/firebase/db/userRepository";
import { app } from "src/firebase/firebase";
import { AuthProvider, User } from "src/types";

export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = withErrorHandling(
  async (): Promise<boolean> => {
    const { user } = await signInWithPopup(auth, googleProvider);
    const userData = await findUserById(user.uid);

    if (!userData) {
      await createUser({
        uid: user.uid,
        name: user.displayName || "",
        authProvider: AuthProvider.google,
        email: user.email || "",
      });
    }

    return true;
  },
);

export const signUp = withErrorHandling(
  async (name: string, email: string, password: string): Promise<boolean> => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await createUser({
      uid: user.uid,
      name,
      authProvider: AuthProvider.local,
      email,
    });

    return true;
  },
);

export const signIn = withErrorHandling(
  async (email: string, password: string): Promise<boolean> => {
    await signInWithEmailAndPassword(auth, email, password);

    return true;
  },
);

export const resetPassword = withErrorHandling(
  async (email: string): Promise<boolean> => {
    await sendPasswordResetEmail(auth, email);

    return true;
  },
);

export const signOut = withErrorHandling(async (): Promise<boolean> => {
  void firebaseSignOut(auth);

  return true;
});

export const fetchUserData = withErrorHandling(
  async (uid: string): Promise<User | undefined> => {
    const userData = await findUserById(uid);

    if (userData) {
      return userData;
    } else {
      throw "userNotFound";
    }
  },
);
