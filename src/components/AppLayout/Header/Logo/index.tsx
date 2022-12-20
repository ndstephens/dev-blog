import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/">
      <a className="flex h-full place-items-center font-display text-3xl font-extrabold uppercase text-primaryClr">
        Nate Stephens
      </a>
    </Link>
  );
}
