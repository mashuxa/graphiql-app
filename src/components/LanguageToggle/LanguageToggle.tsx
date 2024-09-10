"use client";

import { locales, usePathname, useRouter, type Locale } from "src/i18n.config";

import { useLocale, useTranslations } from "next-intl";

const LocaleSwitcher = (): JSX.Element => {
  const t = useTranslations("LocaleSwitcher");

  const locale = useLocale() as Locale;

  const pathname = usePathname();
  const router = useRouter();

  const changeLocale = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const newLocale = event.target.value as Locale;

    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div>
      <select
        value={locale}
        onChange={changeLocale}
        className="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none"
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
