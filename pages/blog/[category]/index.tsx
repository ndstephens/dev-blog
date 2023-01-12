import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';

import React from 'react';
import { useRouter } from 'next/router';

import { useIsClient } from 'usehooks-ts';
import { z } from 'zod';

import ChevronRightIcon from '@assets/icons/chevron-right.svg';
import { blogRoutes } from '@config/routes';
import {
  extractPostMeta,
  getAllPosts,
  getAllPostsByCategory,
  getAllPostTopicsInUse,
  sortPostsByDate,
} from '@scripts/posts';
import {
  PostCategory,
  PostMeta,
  PostTopic,
  PostTopicsSchema,
} from '@scripts/posts/types';
import PageBody from '@ui/PageLayout/PageBody';
import PageHeader from '@ui/PageLayout/PageHeader';
import Pagination from '@ui/Pagination';
import PostPreview from '@ui/Post/PostPreview';
import TopicsFilter from '@ui/TopicsFilter';
import { getPostsAndPages } from '@utils/pagination';
import { capitalizeFirstLetter } from '@utils/strings';
import { validateOptionalQueryParam } from '@utils/url';

export default function BlogLatestPage({
  postsMeta,
  postTopics,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { title, brief } = blogRoutes.find(
    (page) => category === page.title.toLowerCase()
  )!;

  // TODO: refactor all this logic into a custom hook ??
  const isClient = useIsClient();
  const { isReady, query } = useRouter();

  const topicParam = validateOptionalQueryParam(query?.topic, PostTopicsSchema);
  const pageParam = validateOptionalQueryParam(query?.page, z.coerce.number());

  const { posts, currentPage, maxNumOfPages } =
    isClient && isReady
      ? getPostsAndPages(postsMeta, topicParam, pageParam)
      : { posts: [], currentPage: 1, maxNumOfPages: 1 };

  const paginationHref = topicParam
    ? `${category}/?topic=${topicParam}&page=`
    : `${category}/?page=`;

  return (
    <>
      <PageHeader
        bgColor="bg-surfaceClr-2"
        className="tracking-widest text-textClr-1"
      >
        <h1 className="flex font-serif text-5xl font-medium">
          {title.toLocaleUpperCase()}
          {!!topicParam && (
            <>
              <ChevronRightIcon className="mx-4 w-[42px]" />
              <span className="font-normal text-primaryClr-3">
                {capitalizeFirstLetter(topicParam)}
              </span>
            </>
          )}
        </h1>
        <h2 className="mt-4 font-serif text-2xl font-light">{brief}</h2>
      </PageHeader>

      <PageBody
        bgColor="bg-surfaceClr-1"
        className="flex flex-1 flex-col justify-between py-12"
      >
        <div className="grid grid-cols-[1fr,320px] items-start gap-x-24">
          <section className="grid gap-y-12">
            {posts.map((post) => (
              <PostPreview key={post.slug} post={post} />
            ))}
          </section>
          <TopicsFilter
            currentTopic={topicParam}
            topics={postTopics}
            category={category}
          />
        </div>
        {/* PAGINATION */}
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            maxNumOfPages={maxNumOfPages}
            href={paginationHref}
          />
        </div>
      </PageBody>
    </>
  );
}

//* =============================================
//*            DATA FETCHING                    =
//*==============================================
// PATHS
export const getStaticPaths: GetStaticPaths = async () => {
  const categories = blogRoutes
    .map((route) => route.title.toLowerCase())
    .map((category) => ({
      params: { category },
    }));

  return {
    paths: categories,
    fallback: false,
  };
};

// PROPS
interface StaticProps {
  postsMeta: PostMeta[];
  postTopics: PostTopic[];
  category: PostCategory | 'latest';
}

export const getStaticProps: GetStaticProps<StaticProps> = async ({
  params,
}) => {
  // TODO: validate response data using zod
  const category = params?.category as PostCategory | 'latest';
  const allPosts =
    category === 'latest'
      ? await getAllPosts()
      : await getAllPostsByCategory(category);
  const sortedPosts = allPosts.sort(sortPostsByDate);
  const postsMeta = sortedPosts.map(extractPostMeta);

  const postTopics = getAllPostTopicsInUse(allPosts);

  // TODO: handle an empty array better
  if (!allPosts) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      postsMeta,
      postTopics,
      category,
    },
  };
};
