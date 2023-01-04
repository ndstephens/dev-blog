import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/">
      <a className="flex items-center overflow-hidden border border-primaryClr-7 font-display text-lg font-normal uppercase tracking-[0.16em] text-primaryClr xs:text-[22px]">
        <span className="-mt-[1px] border-r border-primaryClr-7 py-[5px] pl-[7px] pr-[3px] leading-none xs:-mt-[2px] xs:py-[7px] xs:pl-[8px] xs:pr-[4px]">
          Nate
        </span>
        <span className="-mt-[1px] py-[5px] pl-[7px] pr-[3px] leading-none xs:-mt-[2px] xs:py-[7px] xs:pl-[8px] xs:pr-[4px]">
          Stephens
        </span>
      </a>
    </Link>
  );
}
