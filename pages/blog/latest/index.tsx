import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useIsClient } from 'usehooks-ts';
import { z } from 'zod';

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
import { numClamp } from '@utils/numbers';

//* =============================================
//*              UTIL FUNCTIONS                 =
//*==============================================
const verifyTopicParam = (topicParam: unknown) => {
  const topicParamSchema = PostTopicsSchema.optional();
  const result = topicParamSchema.safeParse(topicParam);
  return result.success ? result.data : undefined;
};

const verifyPageParam = (pageParam: unknown) => {
  const pageParamSchema = z.coerce.number().optional();
  const result = pageParamSchema.safeParse(pageParam);
  return result.success ? result.data : undefined;
};

const getPostsAndPages = (
  postsMeta: PostMeta[],
  topicParam: string | undefined,
  pageParam: number | undefined,
  numPostsPerPage: number
) => {
  const allPostsOfTopic = postsMeta.filter((postMeta) =>
    !topicParam ? true : postMeta.topics.includes(topicParam as PostTopic)
  );
  const maxNumOfPages = Math.ceil(allPostsOfTopic.length / numPostsPerPage);
  const page = !pageParam
    ? 1
    : numClamp(Math.floor(pageParam), 1, maxNumOfPages);

  // console.log('allPosts:', allPostsOfTopic);
  // console.log('topicParam:', topicParam);
  // console.log('pageParam:', pageParam);
  // console.log('numPostsPerPage:', numPostsPerPage);
  // console.log('maxNumPages:', maxNumOfPages);
  // console.log('page:', page);

  const startIndex = (page - 1) * numPostsPerPage;
  const endIndex = startIndex + numPostsPerPage;

  // console.log('start:', startIndex);

  const posts = allPostsOfTopic.slice(startIndex, endIndex);

  // console.log('posts', posts);

  return {
    posts,
    page,
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

  const topicParam = verifyTopicParam(query?.topic);
  const pageParam = verifyPageParam(query?.page);

  const { posts, page, maxNumOfPages } =
    isClient && isReady
      ? getPostsAndPages(postsMeta, topicParam, pageParam, 10)
      : { posts: [], page: 1, maxNumOfPages: 1 };

  // TODO: use zod to verify that query.topic is a string, try to break url
  // TODO: implement pagination with basic UI
  // TODO: refactor all this logic into a custom hook

  return (
    <>
      <PageContentWrapper bgColor="bg-surfaceClr-2">
        <PageHeader>
          <h1 className="font-serif text-7xl tracking-wide text-textClr-1">
            Latest:
          </h1>
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
