import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import type { PostMeta, PostTopic } from 'src/postsApi/postConfig';

import {
  extractPostMeta,
  filterPostByTopic,
  getAllPosts,
  getAllPostTopicsInUse,
  sortPostsByDate,
} from 'src/postsApi/fetchLocalPosts';

export default function PostsByTopicPage({
  posts,
  topic,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <h1>
        All Posts By <em>{topic}</em> Topic Page
      </h1>
      <ul>
        {posts.map((post) => (
          <li key={post.title}>
            <pre>{JSON.stringify(post, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </>
  );
}

/* =============================================
              GET STATIC PROPS
============================================= */
interface StaticProps {
  topic: PostTopic;
  posts: PostMeta[];
}

export const getStaticProps: GetStaticProps<StaticProps> = async ({
  params,
}) => {
  const { topic } = params as { topic: PostTopic };
  const allPosts = await getAllPosts();
  const allPostsWithTopic = allPosts.filter((post) =>
    filterPostByTopic(post, topic)
  );
  const sortedPosts = allPostsWithTopic.sort(sortPostsByDate);
  const postsMeta = sortedPosts.map(extractPostMeta);

  if (!allPosts) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      topic,
      posts: postsMeta,
    },
  };
};

/* =============================================
              GET STATIC PATHS
============================================= */
export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPosts();
  const allPostTopicsInUse = getAllPostTopicsInUse(allPosts);
  const paths = allPostTopicsInUse.map((topic) => ({ params: { topic } }));

  return {
    paths,
    fallback: false,
  };
};
