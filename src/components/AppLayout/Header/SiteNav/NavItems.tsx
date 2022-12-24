import Link from 'next/link';
import { useRouter } from 'next/router';

import { Popover } from '@headlessui/react';
import clsx from 'clsx';
import { AnimatePresence, motion as m } from 'framer-motion';

import MenuArrow from '@assets/icons/chevron-down.svg';

//* =============================================
//*                NAV ITEM                     =
//*==============================================
interface NavItemProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  onClick?: () => void;
}
export const NavItem = ({
  children,
  href,
  className,
  onClick,
}: NavItemProps) => {
  const { pathname } = useRouter();
  const isActivePage = pathname === href;

  return (
    <li onClick={onClick} className={className}>
      <Link href={href}>
        <a
          aria-current={isActivePage && 'page'}
          className="flex h-full items-center px-5 transition-colors aria-[current=page]:text-textClr-1 hocus-within:text-textClr-1"
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
  const { pathname } = useRouter();
  const isActivePage = pathname.startsWith('/blog');

  return (
    <Popover as="li" className="relative md:h-full">
      {({ close, open }) => (
        <>
          <Popover.Button
            className={clsx(
              'flex items-center px-5 hover:text-textClr-1 ui-open:text-textClr-1 md:h-full',
              isActivePage ? 'text-textClr-1' : 'text-textClr-3'
            )}
          >
            {label}
            <MenuArrow aria-hidden className="ml-1 w-3.5" />
          </Popover.Button>

          <AnimatePresence>
            {open && (
              <Popover.Panel
                static
                as={m.ul}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.17 }}
                role="list"
                className="overflow-hidden backdrop-blur-lg md:absolute md:top-full md:min-w-full"
              >
                {menuItems.map((item) => (
                  <NavItem
                    key={item.label}
                    href={item.href}
                    onClick={() => close()}
                    className="md:h-9"
                  >
                    {item.label}
                  </NavItem>
                ))}
              </Popover.Panel>
            )}
          </AnimatePresence>
        </>
      )}
    </Popover>
  );
}
