import { httpMethodList } from "src/types";
import * as yup from "yup";

export const headerKeyRegex = /^[a-zA-Z0-9\-]+$/;
export const headerValueRegex = /^[^\x00-\x1F\x7F]*$/;

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      "Domain must contain at least two characters after the dot",
    )
    .required("Email is required"),
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
  email: yup
    .string()
    .email("Invalid email")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      "Domain must contain at least two characters after the dot",
    )
    .required("Email is required"),
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

export const resetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      "Domain must contain at least two characters after the dot",
    )
    .required("Email is required"),
});

export const restSchema = yup.object().shape({
  method: yup
    .string()
    .oneOf(httpMethodList, "Should be Http method")
    .required("Method is required"),
  url: yup.string().url("Invalid URL").required("URL is required"),
  body: yup.string(),
});

export const graphqlSchema = yup.object().shape({
  url: yup.string().url("Invalid URL").required("URL is required"),
  body: yup.string().required("Body is required"),
});
