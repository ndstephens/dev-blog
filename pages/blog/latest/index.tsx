import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useIsClient } from 'usehooks-ts';
import { z } from 'zod';

import { POSTS_PER_PAGE } from '@config/pages';
// import PostPreview from '@ui/PostPreview';
import {
  extractPostMeta,
  getAllPosts,
  getAllPostTopicsInUse,
  sortPostsByDate,
} from '@scripts/posts';
import { PostMeta, PostTopic, PostTopicsSchema } from '@scripts/posts/types';
import PageContentWrapper from '@ui/PageLayout/PageContentWrapper';
import PageHeader from '@ui/PageLayout/PageHeader';
import Pagination from '@ui/Pagination';
import { numClamp } from '@utils/numbers';
import { validateOptionalQueryParam } from '@utils/url';

//* =============================================
//*              UTIL FUNCTIONS                 =
//*==============================================
const getPostsAndPages = (
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
//*                 COMPONENT                   =
//*==============================================
export default function BlogLatestPage({
  postsMeta,
  postTopics,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isClient = useIsClient();
  const { isReady, pathname, query } = useRouter();

  const topicParam = validateOptionalQueryParam(query?.topic, PostTopicsSchema);
  const pageParam = validateOptionalQueryParam(query?.page, z.coerce.number());

  const { posts, currentPage, maxNumOfPages } =
    isClient && isReady
      ? getPostsAndPages(postsMeta, topicParam, pageParam, 1)
      : { posts: [], currentPage: 1, maxNumOfPages: 1 };

  const paginationHref = topicParam
    ? `${pathname}/?topic=${topicParam}&page=`
    : `${pathname}/?page=`;

  // TODO: implement pagination with basic UI
  // TODO: refactor all this logic into a custom hook ??

  return (
    <>
      <PageContentWrapper bgColor="bg-surfaceClr-2">
        <PageHeader>
          <h1 className="font-serif text-7xl tracking-wide text-textClr-1">
            Latest:
          </h1>
          <Pagination
            currentPage={currentPage}
            maxNumOfPages={maxNumOfPages}
            href={paginationHref}
          />
        </PageHeader>
      </PageContentWrapper>
      <PageContentWrapper>
        <section className="pt-8 pb-8">
          <ul>
            {postTopics.map((postTopic) => (
              <li key={postTopic}>
                <Link
                  href={
                    query?.topic === postTopic
                      ? pathname
                      : `${pathname}/?topic=${postTopic}`
                  }
                >
                  <a>{postTopic}</a>
                </Link>
              </li>
            ))}
          </ul>
          <br />
          <ul>
            {posts.map((post) => (
              <li key={post.title}>
                {/* <PostPreview post={post} /> */}
                <pre>{JSON.stringify(post, null, 2)}</pre>
              </li>
            ))}
          </ul>
        </section>
      </PageContentWrapper>
    </>
  );
}

//* =============================================
//*            DATA FETCHING                    =
//*==============================================
interface StaticProps {
  postsMeta: PostMeta[];
  postTopics: PostTopic[];
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const allPosts = await getAllPosts();
  const sortedPosts = allPosts.sort(sortPostsByDate);
  const postsMeta = sortedPosts.map(extractPostMeta);

  const postTopics = getAllPostTopicsInUse(allPosts);

  if (!allPosts) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      postsMeta,
      postTopics,
    },
  };
};
