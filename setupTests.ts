import "@testing-library/jest-dom";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useParams: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("./i18n.config", () => ({
  ...jest.requireActual("./i18n.config"),
  Link: jest.fn(),
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));
