import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { config } from "src/firebase/config";

export const app = initializeApp(config);
export const db = getFirestore(app);
