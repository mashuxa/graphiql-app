import { FC } from "react";
import { Link } from "src/i18n.config";

interface NavigationLink {
  href: string;
  title: string;
}
interface NavigationProps {
  links: NavigationLink[];
}

const Navigation: FC<NavigationProps> = ({ links }) => {
  return (
    <nav>
      <ul className="flex justify-center space-x-6 mb-6">
        {links.map(({ href, title }) => (
          <li key={href}>
            <Link href={href} className="block border p-3">
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
