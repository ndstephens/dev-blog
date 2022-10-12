import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import { getAllPosts } from 'src/postsApi/fetchLocalPosts';
import { PostMeta } from 'src/postsApi/postConfig';

const BlogPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <h1>Blog Page</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.title}>
            <pre>{JSON.stringify(post, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BlogPage;

/* =============================================
              DATA FETCHING
============================================= */
interface PostMetaProps {
  posts: PostMeta[];
}

export const getStaticProps: GetStaticProps<PostMetaProps> = async () => {
  const allPosts = await getAllPosts();
  const allPostsMeta = allPosts.map((post) => post.meta);

  if (!allPosts) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts: allPostsMeta,
    },
  };
};
