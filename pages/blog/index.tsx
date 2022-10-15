import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { PostMeta } from 'src/postsApi/postConfig';

import {
  extractPostMeta,
  getAllPosts,
  sortPostsByDate,
} from 'src/postsApi/fetchLocalPosts';

export default function AllPostsPage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <h1>All Posts Page (Blog Index)</h1>
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
              DATA FETCHING
============================================= */
interface StaticProps {
  posts: PostMeta[];
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const allPosts = await getAllPosts();
  const sortedPosts = allPosts.sort(sortPostsByDate);
  const postsMeta = sortedPosts.map(extractPostMeta);

  if (!allPosts) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts: postsMeta,
    },
  };
};
