import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { RSS_REACT_GITHUB_URL, teamData } from "src/constants";

const footer: FC = () => {
  return (
    <footer data-testid="footer">
      <ul className="flex gap-2 justify-center items-center py-2 text-white bg-cyan-700">
        <li className="footer__item">
          <Link href={teamData.mashuxa.github} target="_blank">
            <Image
              className="rounded-full"
              src={teamData.mashuxa.avatar}
              width={48}
              height={48}
              alt={teamData.mashuxa.name}
            />
          </Link>
        </li>
        <li>
          <Link href={teamData.dimabaril.github} target="_blank">
            <Image
              className="rounded-full"
              src={teamData.dimabaril.avatar}
              width={48}
              height={48}
              alt={teamData.dimabaril.name}
            />
          </Link>
        </li>
        <li>
          <Link href={teamData.alexander.github} target="_blank">
            <Image
              className="rounded-full"
              src={teamData.alexander.avatar}
              width={48}
              height={48}
              alt={teamData.alexander.name}
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
