import { useRef } from 'react';
import Link from 'next/link';

import { SocialIcons } from 'src/components/AppLayout/Header/SocialIcons';
import { useNavHoverAndClick } from 'src/utils/hooks/useNavHoverAndClick';

export default function SiteNav() {
  const blogMenuRef = useRef<HTMLLIElement>(null);
  const [isBlogNavOpen, toggleBlogNav, closeBlogNav] =
    useNavHoverAndClick(blogMenuRef);

  return (
    <nav className="ml-auto flex h-full">
      <PrimaryMenu>
        <li ref={blogMenuRef} className="relative">
          <span
            onClick={toggleBlogNav}
            className="hover flex h-full place-items-center px-3"
          >
            Blog
          </span>
          <ul
            onClick={closeBlogNav}
            className={`absolute top-full min-w-full backdrop-blur ${
              isBlogNavOpen ? 'block' : 'hidden'
            }`}
          >
            <li className="h-headerHeight">
              <Link href="/">
                <a className="flex h-full place-items-center px-3">Latest</a>
              </Link>
            </li>
            <li>Notes</li>
            <li>Snippets</li>
          </ul>
        </li>
        <PrimaryItem>
          <NavItem name="Projects" />
        </PrimaryItem>
        <PrimaryItem>
          <NavLink name="About" href="/about" />
        </PrimaryItem>
        <SocialIcons />
      </PrimaryMenu>
    </nav>
  );
}

/* =============================================
                  NAV MENUS
============================================= */
const PrimaryMenu = ({ children }: { children: React.ReactNode }) => (
  <ul className="flex h-full space-x-2 font-sans text-base font-medium uppercase text-textClr-base">
    {children}
  </ul>
);

/* =============================================
                NAV MENU ITEMS
============================================= */
const PrimaryItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex h-full place-items-center">{children}</li>
);

/* =============================================
                  NAV ITEM
============================================= */
const NavItem = ({ name }: { name: string }) => (
  <span className="p-2">{name}</span>
);

/* =============================================
                  NAV LINK
============================================= */
interface NavLinkProps {
  name: string;
  href: string;
}
const NavLink = ({ name, href }: NavLinkProps) => (
  <Link href={href}>
    <a>
      <NavItem name={name} />
    </a>
  </Link>
);
