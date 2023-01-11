import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useIsClient } from 'usehooks-ts';
import { z } from 'zod';

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
import { getPostsAndPages } from '@utils/pagination';
import { capitalizeFirstLetter } from '@utils/strings';
import { validateOptionalQueryParam } from '@utils/url';

export default function BlogLatestPage({
  postsMeta,
  postTopics,
  category,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { title, description } = blogRoutes.find(
    (page) => category === page.title.toLowerCase()
  )!;

  // TODO: refactor all this logic into a custom hook ??
  const isClient = useIsClient();
  const { isReady, query } = useRouter();

  const topicParam = validateOptionalQueryParam(query?.topic, PostTopicsSchema);
  const pageParam = validateOptionalQueryParam(query?.page, z.coerce.number());

  const { posts, currentPage, maxNumOfPages } =
    isClient && isReady
      ? // TODO: remove "1" for num of posts per page
        getPostsAndPages(postsMeta, topicParam, pageParam)
      : { posts: [], currentPage: 1, maxNumOfPages: 1 };

  const paginationHref = topicParam
    ? `${category}/?topic=${topicParam}&page=`
    : `${category}/?page=`;

  return (
    <>
      <PageHeader className="bg-surfaceClr-2 tracking-widest text-textClr-1">
        <h1 className="font-serif text-5xl font-medium">
          {/* {capitalizeFirstLetter(title)}: */}
          {title.toLocaleUpperCase()}:
          <span className="ml-6 text-5xl font-light text-primaryClr">
            {/* {!!topicParam && topicParam.toLocaleUpperCase()} */}
            {!!topicParam && capitalizeFirstLetter(topicParam)}
          </span>
        </h1>
        <h2 className="mt-4 font-serif text-2xl font-normal">{description}</h2>
      </PageHeader>

      <PageBody className="bg-surfaceClr-1">
        <section className="py-8">
          <ul>
            {postTopics.map((postTopic) => (
              <li key={postTopic}>
                <Link
                  href={
                    query?.topic === postTopic
                      ? category
                      : `${category}/?topic=${postTopic}`
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
                <pre>{JSON.stringify(post, null, 2)}</pre>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            maxNumOfPages={maxNumOfPages}
            href={paginationHref}
            className="pb-8"
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
  category: string;
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
