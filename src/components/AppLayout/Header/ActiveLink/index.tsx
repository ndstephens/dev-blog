import Link from 'next/link';

import { activeLink, inactiveLink } from './ActiveLink.module.scss';

interface ActiveLinkProps {
  name: string;
  href: string;
  isActive: boolean;
}

export function ActiveLink({ name, href, isActive }: ActiveLinkProps) {
  const className = isActive ? activeLink : inactiveLink;

  return (
    <Link href={href}>
      <a className={className}>{name}</a>
    </Link>
  );
}
