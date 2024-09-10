import { createSharedPathnamesNavigation } from "next-intl/navigation";

export enum Locale {
  EN = "en",
  RU = "ru",
}

export const locales = Object.values(Locale);

export const defaultLocale = Locale.EN;

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });
