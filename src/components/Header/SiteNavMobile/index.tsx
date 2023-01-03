import Link from 'next/link';
import { useRouter } from 'next/router';

import { Popover } from '@headlessui/react';
import clsx from 'clsx';
import { AnimatePresence, motion as m } from 'framer-motion';

import MenuIcon from '@assets/icons/menu/menu.svg';
import { blogRoutes, primaryRoutes } from '@config/routes';

import ThemeSelect from '../ThemeSelect';

export default function SiteNavMobile() {
  return (
    <Popover as="nav" aria-label="Main" className="flex h-full md:hidden">
      {({ open }) => (
        // "open" needed for AnimatePresence to work
        <>
          <Popover.Button
            aria-label="Menu"
            className="-mr-3 px-3 transition-colors hocus-within:text-textClr-1"
          >
            <MenuIcon aria-hidden className="w-[1.25rem]" />
          </Popover.Button>

          <AnimatePresence>
            {open && (
              <>
                <Popover.Overlay
                  static
                  key="nav-overlay"
                  as={m.div}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.17 }}
                  className="fixed inset-0 backdrop-blur-md"
                />
                <Popover.Panel
                  static
                  key="nav-panel"
                  as={m.ul}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, type: 'spring' }}
                  role="list" // for VoiceOver in Safari
                  className="fixed top-6 right-6 flex w-[calc(100vw-3rem)] max-w-xs flex-col rounded-md bg-surfaceClr-3 px-6 py-4"
                >
                  {({ close }) => (
                    <>
                      <NavItem className="py-2">Blog</NavItem>
                      {blogRoutes.map((route) => (
                        <NavLink
                          key={route.label}
                          href={route.href}
                          onClick={close}
                          className="py-2 pl-3"
                        >
                          {route.label}
                        </NavLink>
                      ))}
                      {primaryRoutes.map((route) => (
                        <NavLink
                          key={route.label}
                          href={route.href}
                          onClick={close}
                          className="py-2"
                        >
                          {route.label}
                        </NavLink>
                      ))}
                      <div className="order-[-1] my-4 border-t-2 border-surfaceClr-1" />
                      <ThemeSelect className="order-[-2]" />
                    </>
                  )}
                </Popover.Panel>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Popover>
  );
}

//* =============================================
//*                 NAV-ITEM                    =
//*==============================================
interface NavItemProps {
  children: string;
  className?: string;
}
const NavItem = ({ children, className }: NavItemProps) => {
  const { pathname } = useRouter();
  const isActivePage = pathname.startsWith(`/${children.toLocaleLowerCase()}`);

  return (
    <li
      className={clsx(
        `flex items-center ${className}`,
        isActivePage ? 'text-textClr-1' : 'text-textClr-3'
      )}
    >
      {children}
    </li>
  );
};

//* =============================================
//*                 NAV-LINK                    =
//*==============================================
interface NavLinkProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  onClick?: () => void;
}
const NavLink = ({ children, href, className, onClick }: NavLinkProps) => {
  const { pathname } = useRouter();
  const isActivePage = pathname === href;

  return (
    <li onClick={onClick} className={className}>
      <Link href={href}>
        <a
          aria-current={isActivePage && 'page'}
          className="flex items-center transition-colors aria-[current=page]:text-textClr-1 hocus-within:text-textClr-1"
        >
          {children}
        </a>
      </Link>
    </li>
  );
};
