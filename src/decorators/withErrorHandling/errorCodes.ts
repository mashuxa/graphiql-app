export enum FirebaseAuthErrorCodes {
  emailAlreadyInUse = "auth/email-already-in-use",
  invalidEmail = "auth/invalid-email",
  operationNotAllowed = "auth/operation-not-allowed",
  weakPassword = "auth/weak-password",
  userDisabled = "auth/user-disabled",
  userNotFound = "auth/user-not-found",
  wrongPassword = "auth/wrong-password",
  networkRequestFailed = "auth/network-request-failed",
  cancelledPopupRequest = "auth/cancelled-popup-request",
  popupClosedByUser = "auth/popup-closed-by-user",
}

export enum FirestoreErrorCodes {
  permissionDenied = "permission-denied",
  unavailable = "unavailable",
  notFound = "not-found",
  aborted = "aborted",
  deadlineExceeded = "deadline-exceeded",
  alreadyExists = "already-exists",
  cancelled = "cancelled",
  invalidArgument = "invalid-argument",
  resourceExhausted = "resource-exhausted",
  internal = "internal",
  failedPrecondition = "failed-precondition",
  outOfRange = "out-of-range",
  unauthenticated = "unauthenticated",
}

export type FirebaseErrorCodes = FirebaseAuthErrorCodes & FirestoreErrorCodes;

export const codes = Object.values({
  ...FirebaseAuthErrorCodes,
  ...FirestoreErrorCodes,
});

// @todo: move to i18n
export const errorMessages: Record<
  FirebaseAuthErrorCodes | FirestoreErrorCodes,
  string
> = {
  [FirebaseAuthErrorCodes.emailAlreadyInUse]:
    "This email is already in use. Please try another one.",
  [FirebaseAuthErrorCodes.invalidEmail]:
    "The email address is not valid. Please enter a valid email address.",
  [FirebaseAuthErrorCodes.operationNotAllowed]:
    "This operation is not allowed. Please contact support.",
  [FirebaseAuthErrorCodes.weakPassword]:
    "The password is too weak. Please choose a stronger password.",
  [FirebaseAuthErrorCodes.userDisabled]:
    "This user account has been disabled. Please contact support.",
  [FirebaseAuthErrorCodes.userNotFound]:
    "No user found with this email. Please check your credentials.",
  [FirebaseAuthErrorCodes.wrongPassword]:
    "The password is incorrect. Please try again.",
  [FirebaseAuthErrorCodes.networkRequestFailed]:
    "Network error occurred. Please check your internet connection and try again.",
  [FirebaseAuthErrorCodes.cancelledPopupRequest]:
    "Sign In with social network cancelled",
  [FirebaseAuthErrorCodes.popupClosedByUser]:
    "Sign In with social network cancelled",
  [FirestoreErrorCodes.permissionDenied]:
    "You do not have permission to access this resource.",
  [FirestoreErrorCodes.unavailable]:
    "The service is temporarily unavailable. Please try again later.",
  [FirestoreErrorCodes.notFound]: "The requested document was not found.",
  [FirestoreErrorCodes.aborted]:
    "The operation was aborted due to a conflict. Please try again.",
  [FirestoreErrorCodes.deadlineExceeded]:
    "The operation took too long to complete. Please try again.",
  [FirestoreErrorCodes.alreadyExists]:
    "The document already exists. Please check your data.",
  [FirestoreErrorCodes.cancelled]: "The operation was cancelled.",
  [FirestoreErrorCodes.invalidArgument]:
    "The provided arguments are invalid. Please check your inputs.",
  [FirestoreErrorCodes.resourceExhausted]:
    "Resource limit has been exceeded. Please try again later.",
  [FirestoreErrorCodes.internal]:
    "An internal server error occurred. Please try again later.",
  [FirestoreErrorCodes.failedPrecondition]:
    "The operation could not be performed due to failed preconditions.",
  [FirestoreErrorCodes.outOfRange]:
    "The input is out of the allowed range. Please adjust your values.",
  [FirestoreErrorCodes.unauthenticated]:
    "You are not authenticated. Please log in and try again.",
};
