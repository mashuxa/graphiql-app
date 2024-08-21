import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import "./Header.scss";

const Header: FC = () => {
  // TODO: on auth show Sign Out, on unauth show Sign In
  return (
    <header data-testid="header" className="header">
      <ul className="header__list">
        <li>
          <Link href="/">
            <Image src="/rss-logo.svg" width={48} height={48} alt="RSS Logo" />
          </Link>
        </li>
        <LanguageToggle />
        <li>
          <Link href="/sign-in">Sign In</Link>
        </li>
        <li>
          <Link href="/sign-out">Sign Out</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
