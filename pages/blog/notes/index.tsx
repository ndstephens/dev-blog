import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { PostMeta } from 'src/postsApi/postConfig';

import {
  extractPostMeta,
  getAllPostsByCategory,
  sortPostsByDate,
} from 'src/postsApi/fetchLocalPosts';

export default function BlogNotesPage({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <h1>All Notes Page</h1>
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
  const allPosts = await getAllPostsByCategory('notes');
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
