import { blogRoutes, primaryRoutes } from '@config/routes';
import ThemeSelect from '@ui/AppLayout/ThemeSelect';

import { NavItemWithSubMenu, NavLink } from './NavLinks';

export default function SiteNavDesktop() {
  return (
    <nav
      aria-label="Main" // aria landmark nav identifier
      className="hidden h-full md:flex"
    >
      <ul
        role="list" // for VoiceOver in Safari
        className="flex h-full divide-x-2 divide-surfaceClr-2"
      >
        <NavItemWithSubMenu label="Blog" menuItems={blogRoutes} />
        {primaryRoutes.map((route) => (
          <NavLink key={route.label} href={route.href}>
            {route.label}
          </NavLink>
        ))}
      </ul>
      <ThemeSelect />
    </nav>
  );
}
