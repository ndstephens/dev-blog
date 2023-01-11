import Link from 'next/link';
import { useRouter } from 'next/router';

import { Popover } from '@headlessui/react';
import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { AnimatePresence, motion as m, MotionProps } from 'framer-motion';

import MenuArrowIcon from '@assets/icons/chevron-down.svg';
import { dropDownMenus } from '@config/animations/menu';

// animation variants
const { child, container } = dropDownMenus;

//* =============================================
//*                NAV-LINK                     =
//*==============================================
const link = cva(
  'flex items-center px-6 transition-colors aria-[current=page]:text-textClr-1 hocus-within:text-textClr-1',
  {
    variants: {
      intent: {
        mainMenu: 'h-full',
        subMenu: 'h-8 my-2',
      },
    },
    defaultVariants: {
      intent: 'mainMenu',
    },
  }
);

interface NavLinkProps extends MotionProps, VariantProps<typeof link> {
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
  intent,
  ...motionProps
}: NavLinkProps) => {
  const { pathname, query } = useRouter();
  const isActivePage =
    intent === 'subMenu'
      ? href.endsWith(query?.category as string)
      : pathname === href;

  return (
    <m.li {...motionProps} onClick={onClick} className={className}>
      <Link href={href}>
        <a
          aria-current={isActivePage && 'page'}
          className={link({ intent, className })}
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
  const isBtnActivePage = pathname.startsWith(`/${label.toLocaleLowerCase()}`);

  return (
    <Popover as="li" className="relative h-full">
      {({ open }) => (
        // "open" needed for AnimatePresence to work
        <>
          <Popover.Button
            className={clsx(
              'flex h-full items-center px-6 transition-colors  hover:text-textClr-1 ui-open:text-textClr-1',
              isBtnActivePage ? 'text-textClr-1' : 'text-textClr-3'
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
                        intent="subMenu"
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
