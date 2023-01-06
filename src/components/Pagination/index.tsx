import Link from 'next/link';

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
}

export default function Pagination({
  currentPage,
  maxNumOfPages,
  href,
  boundaryCount = 0,
  siblingCount = 1,
  showLimitButtons = true,
  showIncrementButtons = true,
}: PaginationProps) {
  if (maxNumOfPages === 1) return null;

  const pageList = getPageList({
    currentPage,
    maxNumOfPages,
    boundaryCount,
    siblingCount,
  });

  return (
    <nav aria-label="Pagination">
      <ul role="list" className="flex list-none items-center">
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
                  disabled={[1, maxNumOfPages].includes(currentPage)}
                  href={href}
                />
              </li>
            );
          } else {
            return (
              <li key={item}>
                <PageLink label={item} currentPage={currentPage} href={href} />
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
}

// wrapper maybe has a top and bottom border
// children will be li's
// each child will have similar padding
// each will have an "onClick" handler
// each will have a disabled prop
// each will update its color and cursor if disabled
// each will otherwise update color on hover
// Page buttons will update color if active page

// RANGE BUTTON
interface RangeLinkProps {
  type: string;
  currentPage: number;
  maxNumOfPages: number;
  disabled: boolean;
  href: string;
}
function RangeLink({
  type,
  currentPage,
  maxNumOfPages,
  disabled,
  href,
}: RangeLinkProps) {
  // TODO: could use better type safety and error checking
  const getIcon = (type: string) => {
    switch (type) {
      case FIRST_PAGE: {
        return [FirstIcon, 'First page', 1];
      }
      case PREV_PAGE: {
        return [PrevIcon, 'Previous page', currentPage - 1];
      }
      case NEXT_PAGE: {
        return [NextIcon, 'Next page', currentPage + 1];
      }
      case LAST_PAGE: {
        return [LastIcon, 'Last page', maxNumOfPages];
      }
      default:
        return;
    }
  };
  const [Icon, label, page] = getIcon(type) as [any, string, number];

  return (
    <Link
      href={`${href}${page}`}
      className={clsx(
        'rounded-full p-2 transition-colors hocus-within:bg-surfaceClr-2',
        !disabled && 'text-textClr-1',
        disabled && 'cursor-default text-textClr-3'
      )}
    >
      <a>
        <span className="sr-only">{label}</span>
        <Icon aria-hidden className="w-4" />
      </a>
    </Link>
  );
}

// PAGE BUTTON
interface PageLinkProps {
  label: number | string;
  currentPage: number;
  href: string;
}
function PageLink({ label, currentPage, href }: PageLinkProps) {
  // TODO: what on page load when there is no "page" query-string, but you're on page-1 b/c there's more than 1 page
  const isActivePage = label === currentPage;

  if (
    typeof label === 'string' &&
    [START_ELLIPSIS, END_ELLIPSIS].includes(label)
  ) {
    return <span className="p-2 pt-4 text-textClr-1">...</span>;
  }

  return (
    <Link
      href={`${href}${label}`}
      className={clsx(
        'rounded-full p-2 tabular-nums text-textClr-1 transition-colors hocus-within:bg-surfaceClr-2',
        isActivePage && 'bg-surfaceClr-2'
      )}
    >
      <a>{label}</a>
    </Link>
  );
}
