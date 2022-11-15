import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { PostMeta } from 'src/postsApi/postConfig';

import PageContentWrapper from 'src/components/PageLayout/PageContentWrapper';
import PageHeader from 'src/components/PageLayout/PageHeader';
import PostPreview from 'src/components/PostPreview';
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
      <PageContentWrapper bgColor="bg-surface-2">
        <PageHeader>
          <h1 className="text-7xl font-bold text-text-base">Hello</h1>
        </PageHeader>
      </PageContentWrapper>
      <PageContentWrapper>
        <section className="pt-8 pb-8">
          <ul>
            {postsMeta.map((postMeta) => (
              <li key={postMeta.title}>
                {/* <PostPreview postMeta={postMeta} /> */}
                <pre>{JSON.stringify(postMeta, null, 2)}</pre>
              </li>
            ))}
          </ul>
        </section>
      </PageContentWrapper>
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
  const recentPosts = limitToRecentPosts(sortedPosts, 10);
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
