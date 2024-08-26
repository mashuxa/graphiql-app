"use client";

import {
  localeNames,
  locales,
  usePathname,
  useRouter,
  type Locale,
} from "../../../i18n.config";

const LocaleSwitcher = ({ locale }: { locale: Locale }): JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();

  const changeLocale = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const newLocale = event.target.value as Locale;

    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div>
      <select value={locale} onChange={changeLocale} className="bg-inherit">
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {localeNames[locale]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
