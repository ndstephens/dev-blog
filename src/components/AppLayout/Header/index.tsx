import { NavDesktop } from 'src/components/AppLayout/Header/NavDesktop';
import { MaxWidthWrapper } from 'src/components/shared';

import { container } from './Header.module.scss';

export function Header() {
  return (
    <header className={container}>
      <MaxWidthWrapper>
        <NavDesktop />
      </MaxWidthWrapper>
    </header>
  );
}
