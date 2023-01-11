import Link from 'next/link';
import { useRouter } from 'next/router';

import { Popover } from '@headlessui/react';
import clsx from 'clsx';
import { AnimatePresence, motion as m } from 'framer-motion';

import MenuIcon from '@assets/icons/menu/menu.svg';
import { navMobileMenu } from '@config/animations/menu';
import { blogRoutes, primaryRoutes } from '@config/routes';

import ThemeSelectMobile from '../ThemeSelectMobile';

// animation variants
const { overlay, panel } = navMobileMenu;

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
                  variants={overlay}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="fixed inset-0 backdrop-blur-md"
                />
                <Popover.Panel
                  static
                  key="nav-panel"
                  as={m.ul}
                  variants={panel}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  role="list" // for VoiceOver in Safari
                  className="fixed top-6 right-6 flex w-[calc(100vw-3rem)] max-w-xs flex-col rounded-md bg-surfaceClr-3 px-6 py-4"
                >
                  {({ close }) => (
                    <>
                      <NavItem>Blog /</NavItem>
                      {blogRoutes.map((route) => (
                        <NavLink
                          key={route.title}
                          href={route.href}
                          onClick={close}
                          className="pl-4"
                        >
                          {route.title}
                        </NavLink>
                      ))}
                      {primaryRoutes.map((route) => (
                        <NavLink
                          key={route.title}
                          href={route.href}
                          onClick={close}
                        >
                          {route.title}
                        </NavLink>
                      ))}
                      <div className="order-[-1] my-4 border-t-2 border-surfaceClr-1" />
                      <ThemeSelectMobile className="order-[-2]" />
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
  const isActivePage = pathname.startsWith(
    `/${children.split(' ')[0]?.toLocaleLowerCase()}`
  );

  return (
    <li
      className={clsx(
        `my-2 flex h-8 items-center transition-colors ${className}`,
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
  const { query } = useRouter();
  const isActivePage = href.endsWith(query?.category as string);

  return (
    <li onClick={onClick} className={`my-2 ${className}`}>
      <Link href={href}>
        <a
          aria-current={isActivePage && 'page'}
          className="flex h-8 items-center transition-colors aria-[current=page]:text-textClr-1 hocus-within:text-textClr-1"
        >
          {children}
        </a>
      </Link>
    </li>
  );
};
