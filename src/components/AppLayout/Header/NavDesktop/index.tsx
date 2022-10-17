import { useRouter } from 'next/router';

import { ActiveLink } from 'src/components/AppLayout/Header/ActiveLink';
import { capitalizeFirstLetter } from 'src/utils/helperFns';

import {
  blank,
  container,
  navGrid,
  navItem,
  navList,
  navWrapper,
} from './NavDesktop.module.scss';

export function NavDesktop() {
  const { pathname } = useRouter();

  const sections = ['blog', 'portfolio', 'about'];

  return (
    <div className={container}>
      <div className={blank} style={{ gridArea: 'blank-start' }} />
      <nav className={navGrid}>
        <div className={navWrapper}>
          <ul className={navList}>
            {sections.map((section) => (
              <li className={navItem} key={section}>
                <ActiveLink
                  name={capitalizeFirstLetter(section)}
                  href={`/${section}`}
                  isActive={pathname.startsWith(`/${section}`)}
                />
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <div className={blank} style={{ gridArea: 'blank-end' }} />
    </div>
  );
}
