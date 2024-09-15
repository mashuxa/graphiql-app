import { FirebaseError } from "@firebase/app";
import { Codes } from "src/decorators/withErrorHandling/errorCodes";
import { WithErrorHandlingType } from "src/decorators/withErrorHandling/types";

const withErrorHandling: WithErrorHandlingType =
  (asyncFn) =>
  async (...args) => {
    try {
      return await asyncFn(...args);
    } catch (error) {
      const isFirebaseError = error instanceof FirebaseError;
      const isKnownError = Object.values(Codes).includes(error as Codes);

      if (isFirebaseError) {
        throw error.code;
      } else if (isKnownError) {
        throw error;
      } else {
        throw "default";
      }
    }
  };

export default withErrorHandling;
