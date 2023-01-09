import type { PostMeta, PostTopic } from '@scripts/posts/types';

import { POSTS_PER_PAGE } from '@config/pages';
import { numClamp } from '@utils/numbers';

//* =============================================
//*         GET POSTS FOR CURRENT PAGE          =
//*==============================================
export const getPostsAndPages = (
  postsMeta: PostMeta[],
  topicParam: string | undefined,
  pageParam: number | undefined,
  numPostsPerPage: number = POSTS_PER_PAGE
) => {
  const postsAboutTopic = postsMeta.filter((postMeta) =>
    !topicParam ? true : postMeta.topics.includes(topicParam as PostTopic)
  );
  const maxNumOfPages = Math.ceil(postsAboutTopic.length / numPostsPerPage);
  const currentPage = !pageParam
    ? 1
    : numClamp(Math.floor(pageParam), 1, maxNumOfPages);

  const startIndex = (currentPage - 1) * numPostsPerPage;
  const endIndex = startIndex + numPostsPerPage;

  const posts = postsAboutTopic.slice(startIndex, endIndex);

  return {
    posts,
    currentPage,
    maxNumOfPages,
  };
};

//* =============================================
//*       FOR CREATING THE PAGINATION UI        =
//*==============================================
export const FIRST_PAGE = 'First';
export const PREV_PAGE = 'Previous';
export const NEXT_PAGE = 'Next';
export const LAST_PAGE = 'Last';
export const START_ELLIPSIS = 'Start';
export const END_ELLIPSIS = 'End';

//* yoinked some code from https://github.com/mui/material-ui/blob/master/packages/mui-material/src/usePagination/usePagination.js
interface PageListProps {
  currentPage: number;
  maxNumOfPages: number;
  boundaryCount?: number;
  siblingCount?: number;
  showLimitButtons?: boolean;
  showIncrementButtons?: boolean;
}
export const getPageList = ({
  currentPage,
  maxNumOfPages,
  boundaryCount = 0,
  siblingCount = 1,
  showLimitButtons = true,
  showIncrementButtons = true,
}: PageListProps) => {
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const startPages = range(1, Math.min(boundaryCount, maxNumOfPages));
  const endPages = range(
    Math.max(maxNumOfPages - boundaryCount + 1, boundaryCount + 1),
    maxNumOfPages
  );

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      currentPage - siblingCount,
      // Lower boundary when currentPage is high
      maxNumOfPages - boundaryCount - siblingCount * 2 - 1
    ),
    // Greater than startPages
    boundaryCount + 2
  );
  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      currentPage + siblingCount,
      // Upper boundary when currentPage is low
      boundaryCount + siblingCount * 2 + 2
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : maxNumOfPages - 1
  );

  const siblingPages = range(siblingsStart, siblingsEnd);

  const startEllipsis =
    siblingsStart > boundaryCount + 2
      ? [START_ELLIPSIS]
      : boundaryCount + 1 < maxNumOfPages - boundaryCount
      ? [boundaryCount + 1]
      : [];
  const endEllipsis =
    siblingsEnd < maxNumOfPages - boundaryCount - 1
      ? [END_ELLIPSIS]
      : maxNumOfPages - boundaryCount > boundaryCount
      ? [maxNumOfPages - boundaryCount]
      : [];

  return [
    ...(showLimitButtons ? [FIRST_PAGE] : []),
    ...(showIncrementButtons ? [PREV_PAGE] : []),
    ...startPages,
    ...startEllipsis,
    ...siblingPages,
    ...endEllipsis,
    ...endPages,
    ...(showIncrementButtons ? [NEXT_PAGE] : []),
    ...(showLimitButtons ? [LAST_PAGE] : []),
  ];
};
