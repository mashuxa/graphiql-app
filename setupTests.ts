import "@testing-library/jest-dom";
import crypto from "crypto";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

Object.defineProperty(globalThis, "crypto", {
  value: crypto,
});

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn(() => ({ push: jest.fn() })),
  usePathname: jest.fn(),
  useParams: jest.fn(() => ({ params: [] })),
  useSearchParams: jest.fn(() => ({ toString: jest.fn() })),
}));

jest.mock("src/i18n.config", () => ({
  ...jest.requireActual("src/i18n.config"),
  Link: jest.fn(),
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock("src/firebase/auth/auth", () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
  },
  fetchUserData: jest.fn(),
}));
