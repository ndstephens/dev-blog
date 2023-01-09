import { useRouter } from 'next/router';

import clsx from 'clsx';

import PrevIcon from '@assets/icons/pagination/chevron-left.svg';
import NextIcon from '@assets/icons/pagination/chevron-right.svg';
import FirstIcon from '@assets/icons/pagination/chevrons-left.svg';
import LastIcon from '@assets/icons/pagination/chevrons-right.svg';
import {
  END_ELLIPSIS,
  FIRST_PAGE,
  getPageList,
  LAST_PAGE,
  NEXT_PAGE,
  PREV_PAGE,
  START_ELLIPSIS,
} from '@utils/pagination';

interface PaginationProps {
  currentPage: number;
  maxNumOfPages: number;
  href: string;
  boundaryCount?: number;
  siblingCount?: number;
  showLimitButtons?: boolean;
  showIncrementButtons?: boolean;
  className?: string;
}

export default function Pagination({
  currentPage,
  maxNumOfPages,
  href,
  boundaryCount = 0,
  siblingCount = 1,
  showLimitButtons = true,
  showIncrementButtons = true,
  className,
}: PaginationProps) {
  if (maxNumOfPages === 1) return null;

  const pageList = getPageList({
    currentPage,
    maxNumOfPages,
    boundaryCount,
    siblingCount,
  });

  return (
    <nav aria-label="Pagination" className={className}>
      <ul role="list" className="flex list-none text-sm">
        {pageList.map((item) => {
          if (
            (showLimitButtons || showIncrementButtons) &&
            typeof item === 'string' &&
            [FIRST_PAGE, PREV_PAGE, NEXT_PAGE, LAST_PAGE].includes(item)
          ) {
            return (
              <li key={item}>
                <RangeLink
                  type={item}
                  currentPage={currentPage}
                  maxNumOfPages={maxNumOfPages}
                  href={href}
                />
              </li>
            );
          } else {
            return (
              <li key={item}>
                <PageLink page={item} currentPage={currentPage} href={href} />
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
}

//* =============================================
//*                RANGE BUTTON                 =
//*==============================================
interface RangeLinkProps {
  type: string;
  currentPage: number;
  maxNumOfPages: number;
  href: string;
}
function RangeLink({ type, currentPage, maxNumOfPages, href }: RangeLinkProps) {
  const router = useRouter();

  // TODO: could use better type safety and error checking
  const getIcon = (type: string) => {
    switch (type) {
      case FIRST_PAGE: {
        return [FirstIcon, 'First page', 1, currentPage === 1];
      }
      case PREV_PAGE: {
        return [PrevIcon, 'Previous page', currentPage - 1, currentPage === 1];
      }
      case NEXT_PAGE: {
        return [
          NextIcon,
          'Next page',
          currentPage + 1,
          currentPage === maxNumOfPages,
        ];
      }
      case LAST_PAGE: {
        return [
          LastIcon,
          'Last page',
          maxNumOfPages,
          currentPage === maxNumOfPages,
        ];
      }
      default:
        return;
    }
  };
  const [Icon, label, page, isDisabled] = getIcon(type) as [
    any,
    string,
    number,
    boolean
  ];

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={() => router.push(`${href}${page}`)}
      className={clsx(
        'mx-[3px] flex aspect-square w-8 items-center justify-center rounded-full transition-colors ',
        !isDisabled && 'text-textClr-1 hocus-within:bg-surfaceClr-3',
        isDisabled && 'text-textClr-3'
      )}
    >
      <span className="sr-only">{label}</span>
      <Icon aria-hidden className="w-[20px]" />
    </button>
  );
}

//* =============================================
//*                PAGE BUTTON                  =
//*==============================================
interface PageLinkProps {
  page: number | string;
  currentPage: number;
  href: string;
}
function PageLink({ page, currentPage, href }: PageLinkProps) {
  const router = useRouter();

  const isActivePage = page === currentPage;

  if (
    typeof page === 'string' &&
    [START_ELLIPSIS, END_ELLIPSIS].includes(page)
  ) {
    return (
      <span className="mx-[3px] flex aspect-square w-8 items-end justify-center pb-[5px] text-textClr-1">
        ...
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => router.push(`${href}${page}`)}
      className={clsx(
        'mx-[3px] flex aspect-square w-8 items-center justify-center rounded-full text-textClr-1 transition-colors hocus-within:bg-surfaceClr-3',
        isActivePage && 'bg-surfaceClr-3'
      )}
    >
      {page}
    </button>
  );
}
