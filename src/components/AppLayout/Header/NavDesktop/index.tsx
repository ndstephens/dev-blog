import { useRouter } from 'next/router';

import { ActiveLink } from 'src/components/AppLayout/Header/ActiveLink';
import { Logo } from 'src/components/AppLayout/Header/Logo';
import { SocialIcons } from 'src/components/AppLayout/Header/SocialIcons';
import { capitalizeFirstLetter } from 'src/utils/helperFns';

import { container, navList, navWrapper } from './NavDesktop.module.scss';

export function NavDesktop() {
  const { pathname } = useRouter();

  const sections = ['notes', 'snippets', 'topics'];

  return (
    <div className={container}>
      <nav className={navWrapper}>
        <Logo />
        <ul className={navList}>
          {sections.map((section) => (
            <li key={section}>
              <ActiveLink
                name={capitalizeFirstLetter(section)}
                href={`/blog/${section}`}
                isActive={pathname.startsWith(`/blog/${section}`)}
              />
            </li>
          ))}
        </ul>
      </nav>
      <SocialIcons />
    </div>
  );
}
