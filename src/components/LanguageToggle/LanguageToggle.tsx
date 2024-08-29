"use client";

import { locales, usePathname, useRouter, type Locale } from "src/i18n.config";

import { useTranslations } from "next-intl";

interface LocaleSwitcherProps {
  locale: Locale;
}

const LocaleSwitcher = ({ locale }: LocaleSwitcherProps): JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();

  const t = useTranslations("LocaleSwitcher");

  const changeLocale = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const newLocale = event.target.value as Locale;

    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div>
      <select
        value={locale}
        onChange={changeLocale}
        className="bg-inherit"
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
