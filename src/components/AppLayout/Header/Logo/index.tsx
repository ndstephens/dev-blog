import Link from 'next/link';

import { wrapper } from './Logo.module.scss';

export function Logo() {
  return (
    <Link href="/">
      <a className={wrapper}>Nate Stephens</a>
    </Link>
  );
}
