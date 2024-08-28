import { FirebaseError } from "@firebase/app";
import {
  codes,
  errorMessages,
  FirebaseErrorCodes,
} from "src/decorators/withErrorHandling/errorCodes";
import { WithErrorHandlingType } from "src/decorators/withErrorHandling/types";

// @todo: add error ui notification
// @todo: add logger
const withErrorHandling: WithErrorHandlingType =
  (asyncFn) =>
  async (...args) => {
    try {
      return await asyncFn(...args);
    } catch (error) {
      const isFirebaseError = error instanceof FirebaseError;

      if (isFirebaseError && codes.includes(error.code as FirebaseErrorCodes)) {
        // alert(errorMessages[error.code as FirebaseErrorCodes]);

        console.error(errorMessages[error.code as FirebaseErrorCodes]);
      } else if (isFirebaseError) {
        //  alert(error.code);

        console.error(`Unknown Firebase error occurred: ${error.code}`);
      } else {
        //  alert(error);

        console.error("Unknown error occurred:", error);
      }
    }
  };

export default withErrorHandling;
