import Image from "next/image";
import { FC } from "react";
import { Link } from "src/i18n.config";

import {
  PROJECT_GITHUB_URL,
  RSS_REACT_GITHUB_URL,
  teamData,
} from "src/constants";

const footer: FC = () => {
  return (
    <footer
      data-testid="footer"
      className="flex justify-between  bg-neutral-800 text-neutral-500 font-medium px-2 py-8"
    >
      <ul className="flex gap-2">
        {teamData.map(({ github, avatar, name }) => (
          <li key={name}>
            <Link href={github} target="_blank">
              <Image
                className="rounded-full"
                src={avatar}
                width={48}
                height={48}
                alt={name}
              />
            </Link>
          </li>
        ))}
      </ul>
      <Link
        className="transition text-center hover:text-primary p-4"
        href={PROJECT_GITHUB_URL}
        target="_blank"
      >
        2024 © Bobr corporation
      </Link>
      <Link href={RSS_REACT_GITHUB_URL} target="_blank">
        <Image src="/rss-logo.svg" width={48} height={48} alt="RSS Logo" />
      </Link>
    </footer>
  );
};

export default footer;
