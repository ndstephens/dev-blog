// import { Popover } from '@headlessui/react';

import {
  NavItem,
  NavItemWithSubMenu,
} from '@ui/AppLayout/Header/SiteNav/NavItems';
// import { SocialIcons } from '@ui/AppLayout/Header/SocialIcons';
import ThemeSelect from '@ui/AppLayout/Header/ThemeSelect';

export default function SiteNav() {
  return (
    <nav
      aria-label="Main"
      className="ml-auto h-full font-sans text-base font-medium uppercase text-textClr-3"
    >
      <div className="flex md:h-full">
        <ul
          role="list"
          className="md:flex md:h-full md:divide-x-2 md:divide-surfaceClr-2"
        >
          <NavItemWithSubMenu
            label="Blog"
            menuItems={[
              {
                label: 'Latest',
                href: '/blog/latest',
              },
              {
                label: 'Notes',
                href: '/blog/notes',
              },
              {
                label: 'Snippets',
                href: '/blog/snippets',
              },
            ]}
          />
          <NavItem href="/projects">Projects</NavItem>
          <NavItem href="/about">About</NavItem>
        </ul>
        <ThemeSelect />
        {/*// TODO: MOVE THIS ELSEWHERE */}
        {/* <SocialIcons /> */}
      </div>
    </nav>
  );
}
