import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "ru"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = "en" as const;

export const localeNames: Record<Locale, string> = {
  en: "English",
  ru: "Russian",
};

export const { Link, usePathname, useRouter } = createSharedPathnamesNavigation(
  { locales },
);
