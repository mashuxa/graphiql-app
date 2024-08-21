import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { RSS_REACT_GITHUB_URL, TEAM_DATA } from "src/constants";

const footer: FC = () => {
  return (
    <footer data-testid="footer">
      <ul className="flex gap-2 justify-center items-center py-2 text-white bg-cyan-700">
        <li className="footer__item">
          <Link href={TEAM_DATA.MASHUXA.GITHUB} target="_blank">
            <Image
              className="rounded-full"
              src={TEAM_DATA.MASHUXA.AVATAR}
              width={48}
              height={48}
              alt={TEAM_DATA.MASHUXA.NAME}
            />
          </Link>
        </li>
        <li>
          <Link href={TEAM_DATA.DIMABARIL.GITHUB} target="_blank">
            <Image
              className="rounded-full"
              src={TEAM_DATA.DIMABARIL.AVATAR}
              width={48}
              height={48}
              alt={TEAM_DATA.DIMABARIL.NAME}
            />
          </Link>
        </li>
        <li>
          <Link href={TEAM_DATA.ALEXANDER.GITHUB} target="_blank">
            <Image
              className="rounded-full"
              src={TEAM_DATA.ALEXANDER.AVATAR}
              width={48}
              height={48}
              alt={TEAM_DATA.ALEXANDER.NAME}
            />
          </Link>
        </li>
        <li>2024</li>
        <li>
          <Link href={RSS_REACT_GITHUB_URL} target="_blank">
            <Image src="/rss-logo.svg" width={48} height={48} alt="RSS Logo" />
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default footer;
