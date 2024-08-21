import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { routes } from "../../constants";
import LanguageToggle from "../LanguageToggle/LanguageToggle";

const Header: FC = () => {
  // TODO: on auth show Sign Out, on unauth show Sign In
  return (
    <header data-testid="header" className="sticky top-0">
      <ul className="flex justify-center items-center py-2 text-white bg-cyan-700">
        <li>
          <Link href={routes.home}>
            <Image src="/rss-logo.svg" width={48} height={48} alt="RSS Logo" />
          </Link>
        </li>
        <LanguageToggle />
        <li>
          <Link className="p-3" href={routes.signIn}>
            Sign In
          </Link>
        </li>
        <li>
          <Link className="p-3" href={routes.signOut}>
            Sign Out
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
