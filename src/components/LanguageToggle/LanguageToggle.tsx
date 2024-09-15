"use client";

import { locales, usePathname, useRouter, type Locale } from "src/i18n.config";

import { useLocale, useTranslations } from "next-intl";
import { ChangeEvent } from "react";

const LocaleSwitcher = (): JSX.Element => {
  const t = useTranslations("LocaleSwitcher");

  const locale = useLocale() as Locale;

  const pathname = usePathname();
  const router = useRouter();

  const changeLocale = (event: ChangeEvent<HTMLSelectElement>): void => {
    const newLocale = event.target.value as Locale;

    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div>
      <select
        value={locale}
        onChange={changeLocale}
        className="text-primary bg-neutral-800 w-26 focus:outline-none"
        data-testid="language-toggle"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {t(locale)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
