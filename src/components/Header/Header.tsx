"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import AuthButton from "src/components/Header/AuthButton/AuthButton";
import LanguageToggle from "src/components/LanguageToggle/LanguageToggle";
import { routes } from "src/constants";
import { Link, Locale } from "src/i18n.config";

const Header: FC = () => {
  const locale = useLocale() as Locale;
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > 0) {
        setIsPinned(true);
      } else {
        setIsPinned(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return (): void => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      data-testid="header"
      className={`sticky top-0 px-2 ${isPinned ? "py-1" : "py-4"} bg-neutral-800 transition-all duration-300`}
    >
      <ul className="flex items-center text-white">
        <li className="mr-auto">
          <Link href={routes.home}>
            <Image src="/rss-logo.svg" width={48} height={48} alt="RSS Logo" />
          </Link>
        </li>
        <LanguageToggle locale={locale} />
        <li className="min-w-24 text-right">
          <AuthButton />
        </li>
      </ul>
    </header>
  );
};

export default Header;
