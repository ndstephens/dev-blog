import { NavDesktop } from 'src/components/AppLayout/Header/NavDesktop';

import { container } from './Header.module.scss';

export function Header() {
  return (
    <header className={container}>
      <NavDesktop />
    </header>
  );
}
