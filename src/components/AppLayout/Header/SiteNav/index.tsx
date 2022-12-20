import {
  NavItemWithSubMenu,
  NavLink,
} from 'src/components/AppLayout/Header/SiteNav/NavItems';
// import { SocialIcons } from 'src/components/AppLayout/Header/SocialIcons';
import ThemeSelect from 'src/components/AppLayout/Header/ThemeSelect';

export default function SiteNav() {
  return (
    <nav className="ml-auto h-full">
      <div className="flex md:h-full">
        <ul className="font-sans text-base font-medium uppercase text-textClr-base md:flex md:h-full md:divide-x-2 md:divide-surfaceClr-2">
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
          <li className="md:h-full">
            <NavLink href="/projects">Projects</NavLink>
          </li>
          <li className="md:h-full">
            <NavLink href="/about">About</NavLink>
          </li>
        </ul>
        <ThemeSelect />
        {/*// TODO: MOVE THIS ELSEWHERE */}
        {/* <SocialIcons /> */}
      </div>
    </nav>
  );
}
