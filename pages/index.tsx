import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { PostMeta } from 'src/postsApi/postConfig';

import { PageBody, PageHeader } from 'src/components/Page';
import PostPreview from 'src/components/PostPreview';
import { VisuallyHidden } from 'src/components/shared';
import {
  extractPostMeta,
  getAllPosts,
  limitToRecentPosts,
  sortPostsByDate,
} from 'src/postsApi/fetchLocalPosts';

export default function HomePage({
  postsMeta,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageHeader>
        <VisuallyHidden>
          <h1>Nate Stephens homepage</h1>
        </VisuallyHidden>
        <h2>Recent Posts...</h2>
      </PageHeader>
      <PageBody>
        <ul>
          {postsMeta.map((postMeta) => (
            <li key={postMeta.title}>
              <PostPreview postMeta={postMeta} />
            </li>
          ))}
        </ul>
      </PageBody>
    </>
  );
}

/* =============================================
              DATA FETCHING
============================================= */
interface StaticProps {
  postsMeta: PostMeta[];
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const allPosts = await getAllPosts();
  const sortedPosts = allPosts.sort(sortPostsByDate);
  const recentPosts = limitToRecentPosts(sortedPosts);
  const postsMeta = recentPosts.map(extractPostMeta);

  if (!allPosts) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      postsMeta,
    },
  };
};
