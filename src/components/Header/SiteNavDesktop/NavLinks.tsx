import Link from 'next/link';
import { useRouter } from 'next/router';

import { Popover } from '@headlessui/react';
import clsx from 'clsx';
import { AnimatePresence, motion as m, MotionProps } from 'framer-motion';

import MenuArrowIcon from '@assets/icons/chevron-down.svg';
import { dropDownMenus } from '@config/animations/menu';

// animation variants
const { child, container } = dropDownMenus;

//* =============================================
//*                NAV-LINK                     =
//*==============================================
interface NavLinkProps extends MotionProps {
  children: React.ReactNode;
  href: string;
  className?: string;
  onClick?: () => void;
}
export const NavLink = ({
  children,
  href,
  className,
  onClick,
  ...motionProps
}: NavLinkProps) => {
  const { pathname } = useRouter();
  const isActivePage = pathname === href;

  return (
    <m.li {...motionProps} onClick={onClick} className={className}>
      <Link href={href}>
        <a
          aria-current={isActivePage && 'page'}
          className="flex h-full items-center px-6 transition-colors aria-[current=page]:text-textClr-1 hocus-within:text-textClr-1"
        >
          {children}
        </a>
      </Link>
    </m.li>
  );
};

//* =============================================
//*           NAV ITEM WITH SUB-MENU            =
//*==============================================
interface Props {
  label: string;
  // TODO: needs to be updated after "blogRoutes" gets properly typed
  menuItems: Array<{
    title: string;
    href: string;
  }>;
}
export function NavItemWithSubMenu({ label, menuItems }: Props) {
  const { pathname } = useRouter();
  const isActivePage = pathname.startsWith(`/${label.toLocaleLowerCase()}`);

  return (
    <Popover as="li" className="relative h-full">
      {({ open }) => (
        // "open" needed for AnimatePresence to work
        <>
          <Popover.Button
            className={clsx(
              'flex h-full items-center px-6 transition-colors  hover:text-textClr-1 ui-open:text-textClr-1',
              isActivePage ? 'text-textClr-1' : 'text-textClr-3'
            )}
          >
            {label}
            <MenuArrowIcon aria-hidden className="ml-1 w-4" />
          </Popover.Button>

          <AnimatePresence>
            {open && (
              <Popover.Panel
                static
                as={m.ul}
                variants={container}
                initial="initial"
                animate="animate"
                exit="exit"
                role="list" // for VoiceOver in Safari
                className="absolute top-full min-w-full rounded-b backdrop-blur-lg"
              >
                {({ close }) => (
                  <>
                    {menuItems.map((item) => (
                      <NavLink
                        key={item.title}
                        variants={child}
                        href={item.href}
                        onClick={close}
                        className="my-2 py-1"
                      >
                        {item.title}
                      </NavLink>
                    ))}
                  </>
                )}
              </Popover.Panel>
            )}
          </AnimatePresence>
        </>
      )}
    </Popover>
  );
}
