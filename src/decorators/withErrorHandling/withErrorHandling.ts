import { FirebaseError } from "@firebase/app";
import {
  codes,
  errorMessages,
  FirebaseErrorCodes,
} from "src/decorators/withErrorHandling/errorCodes";
import { WithErrorHandlingType } from "src/decorators/withErrorHandling/types";

// @todo: add logger
const withErrorHandling: WithErrorHandlingType =
  (asyncFn) =>
  async (...args) => {
    try {
      return await asyncFn(...args);
    } catch (error) {
      const isFirebaseError = error instanceof FirebaseError;

      if (isFirebaseError && codes.includes(error.code as FirebaseErrorCodes)) {
        // console.error(errorMessages[error.code as FirebaseErrorCodes]);
        throw new Error(errorMessages[error.code as FirebaseErrorCodes]);
      } else if (isFirebaseError) {
        // console.error(`Unknown Firebase error occurred: ${error.code}`);
        throw new Error(error.code);
      } else {
        // console.error("Unknown error occurred:", error);
        throw new Error("Unknown error occurred");
      }
    }
  };

export default withErrorHandling;
