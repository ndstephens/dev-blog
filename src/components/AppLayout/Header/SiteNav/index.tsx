import Link from 'next/link';

import { Logo } from 'src/components/AppLayout/Header/SiteNav/Logo';
import { SocialIcons } from 'src/components/AppLayout/Header/SiteNav/SocialIcons';
import { capitalizeFirstLetter } from 'src/utils/helperFns';

export default function SiteNav() {
  const sections = ['notes', 'snippets', 'topics'];

  return (
    <div className="flex h-full">
      <nav className="flex h-full items-baseline">
        <Logo />
        <ul className="flex h-full items-center">
          {sections.map((section) => (
            <li key={section}>
              <NavLink
                name={capitalizeFirstLetter(section)}
                href={`/blog/${section}`}
              />
            </li>
          ))}
        </ul>
      </nav>
      <SocialIcons />
    </div>
  );
}

/* =============================================
              NAV LINK
============================================= */
interface NavLinkProps {
  name: string;
  href: string;
}

function NavLink({ name, href }: NavLinkProps) {
  return (
    <Link href={href}>
      <a className="p-2 font-sans text-base font-medium uppercase text-text-base">
        {name}
      </a>
    </Link>
  );
}
