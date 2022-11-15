import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/">
      <a className="mr-8 flex h-full place-items-center font-display text-3xl font-bold text-primary-1">
        Nate Stephens
      </a>
    </Link>
  );
}
