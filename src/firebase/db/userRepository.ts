import { addDoc, collection, getDocs, limit } from "@firebase/firestore";
import { query, where } from "firebase/firestore";
import { db } from "src/firebase/firebase";
import { User } from "src/types";

const COLLECTION_NAME = "users";
const DEFAULT_ROLE = "user";

export const findUserById = async (uid: string): Promise<User | null> => {
  const users = collection(db, COLLECTION_NAME);
  const userById = query(users, where("uid", "==", uid), limit(1));
  const { docs } = await getDocs(userById);

  return docs.length ? (docs[0].data() as User) : null;
};

export const createUser = async (userData: User): Promise<void> => {
  await addDoc(collection(db, COLLECTION_NAME), {
    ...userData,
    role: DEFAULT_ROLE,
  });
};
