import { httpMethodList } from "src/types";
import * as yup from "yup";

export const headerKeyRegex = /^[a-zA-Z0-9-]+$/;
export const headerValueRegex = /^[^\x00-\x1F\x7F]*$/;

export const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/\p{L}/u, "Password must contain at least one letter")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(
      /\p{P}|\p{S}/u,
      "Password must contain at least one special character",
    )
    .required("Password is required"),
});

export const registrationSchema = yup.object().shape({
  name: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/\p{L}/u, "Password must contain at least one letter")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(
      /\p{P}|\p{S}/u,
      "Password must contain at least one special character",
    )
    .required("Password is required"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

export const restSchema = yup.object().shape({
  method: yup
    .string()
    .oneOf(httpMethodList, "Should be Http method")
    .required("Method is required"),
  url: yup.string().url("Invalid URL").required("URL is required"),
  //   headers: yup.array().of(
  //     yup.object().shape({
  //       key: yup
  //         .string()
  //         .matches(
  //           headerKeyRegex,
  //           "Header key must contain only Latin letters, digits, and hyphens",
  //         )
  //         .required("Header key is required"),
  //       value: yup
  //         .string()
  //         .matches(headerValueRegex, "Header value contains invalid characters")
  //         .required("Header value is required"),
  //     }),
  //   ),
  body: yup.string(),
  //   variables: yup.array().of(
  //     yup.object().shape({
  //       key: yup
  //         .string()
  //         .matches(
  //           headerKeyRegex,
  //           "Header key must contain only Latin letters, digits, and hyphens",
  //         )
  //         .required("Variable key is required"),
  //       value: yup.string().required("Variable value is required"),
  //     }),
  //   ),
});
