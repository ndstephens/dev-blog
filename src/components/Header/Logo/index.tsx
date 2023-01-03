import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/">
      <a className="flex h-full place-items-center font-display text-lg font-extrabold uppercase text-primaryClr xs:text-2xl">
        Nate Stephens
      </a>
    </Link>
  );
}
