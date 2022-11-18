import { useRef } from 'react';
import Link from 'next/link';

import { useNavHoverAndClick } from 'src/utils/hooks/useNavHoverAndClick';

/* =============================================
            NAV ITEM WITH SUB-MENU
============================================= */
interface Props {
  label: string;
  menuItems: Array<{
    label: string;
    href: string;
  }>;
}
export function NavItemWithSubMenu({ label, menuItems }: Props) {
  const menuRef = useRef<HTMLLIElement>(null);
  const [isSubMenuOpen, toggleSubMenu, closeSubMenu] =
    useNavHoverAndClick(menuRef);

  return (
    <li ref={menuRef} className="md:relative md:h-full">
      <Label onClick={toggleSubMenu}>{label}</Label>
      <ul
        onClick={closeSubMenu}
        className={`backdrop-blur-lg md:absolute md:top-full md:min-w-full md:divide-y-2 md:divide-surfaceClr-2 ${
          isSubMenuOpen ? 'not-sr-only' : 'sr-only'
        }`}
      >
        {menuItems.map((item) => (
          <li key={item.label}>
            <NavLink href={item.href}>{item.label}</NavLink>
          </li>
        ))}
      </ul>
    </li>
  );
}

/* =============================================
                  LABEL
============================================= */
interface LabelProps {
  children: React.ReactNode;
  onClick?: () => void;
}
const Label = ({ children, onClick }: LabelProps) => (
  <span onClick={onClick} className="flex h-headerHeight items-center px-5">
    {children}
  </span>
);

/* =============================================
                  NAV LINK
============================================= */
interface NavLinkProps {
  children: React.ReactNode;
  href: string;
}
export const NavLink = ({ children, href }: NavLinkProps) => (
  <Link href={href}>
    <a>
      <Label>{children}</Label>
    </a>
  </Link>
);
