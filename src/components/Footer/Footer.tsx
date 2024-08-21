import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import "./Footer.scss";

const footer: FC = () => {
  return (
    <footer data-testid="footer" className="footer">
      <ul className="footer__list">
        <li className="footer__item">
          <Link href="https://github.com/mashuxa" target="_blank">
            <Image
              className="git-icon"
              src="https://avatars.githubusercontent.com/u/20760363?v=4"
              width={48}
              height={48}
              alt="mashuxa"
            />
          </Link>
        </li>
        <li className="footer__item">
          <Link href="https://github.com/dimabaril" target="_blank">
            <Image
              className="git-icon"
              src="https://avatars.githubusercontent.com/u/104690609?v=4"
              width={48}
              height={48}
              alt="dimabaril"
            />
          </Link>
        </li>
        <li className="footer__item">
          <Link href="https://github.com/mashuxa" target="_blank">
            <Image
              className="git-icon"
              src="https://avatars.githubusercontent.com/u/20760363?v=4"
              width={48}
              height={48}
              alt="mashuxa"
            />
          </Link>
        </li>
        <li className="footer__item">2024</li>
        <li>
          <Link href="https://rs.school/courses/reactjs" target="_blank">
            <Image src="/rss-logo.svg" width={48} height={48} alt="RSS Logo" />
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default footer;
