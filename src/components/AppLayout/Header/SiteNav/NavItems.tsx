import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Popover } from '@headlessui/react';
import clsx from 'clsx';

import MenuArrow from '@assets/icons/chevron-down.svg';

//* =============================================
//*                NAV ITEM                     =
//*==============================================
interface NavItemProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}
export const NavItem = ({ children, href, className }: NavItemProps) => {
  const { pathname } = useRouter();
  const isActivePage = pathname === href;

  return (
    <li className={className}>
      <Link href={href}>
        <a
          aria-current={isActivePage && 'page'}
          className="flex h-full items-center px-5 hover:text-textClr-1 aria-[current=page]:text-textClr-1"
        >
          {children}
        </a>
      </Link>
    </li>
  );
};

//* =============================================
//*           NAV ITEM WITH SUB-MENU            =
//*==============================================
interface Props {
  label: string;
  menuItems: Array<{
    label: string;
    href: string;
  }>;
}
export function NavItemWithSubMenu({ label, menuItems }: Props) {
  const [parent] = useAutoAnimate<HTMLLIElement>({
    duration: 100,
    // easing: 'ease-in',
  });
  const { pathname } = useRouter();
  const isActivePage = pathname.startsWith('/blog');

  return (
    <Popover ref={parent} as="li" className="relative md:h-full">
      <Popover.Button
        className={clsx(
          'flex items-center px-5 hover:text-textClr-1 ui-open:text-textClr-1 md:h-full',
          isActivePage ? 'text-textClr-1' : 'text-textClr-3'
        )}
      >
        {label}
        <MenuArrow aria-hidden className="ml-1 w-3.5" />
      </Popover.Button>
      <Popover.Panel
        as="ul"
        role="list"
        className="backdrop-blur-lg md:absolute md:top-full md:min-w-full md:divide-y-2 md:divide-surfaceClr-2"
      >
        {menuItems.map((item) => (
          <NavItem href={item.href} key={item.label} className="md:h-9">
            <Popover.Button>{item.label}</Popover.Button>
          </NavItem>
        ))}
      </Popover.Panel>
    </Popover>
  );
}
