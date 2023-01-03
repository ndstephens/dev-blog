import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import type { PostMeta } from 'src/postsApi/postConfig';

import PageContentWrapper from '@ui/PageLayout/PageContentWrapper';
import PageHeader from '@ui/PageLayout/PageHeader';

// import PostPreview from '@ui/PostPreview';
import {
  extractPostMeta,
  getAllPosts,
  getSliceOfPosts,
  sortPostsByDate,
} from 'src/postsApi/fetchLocalPosts';

export default function BlogLatestPage({
  postsMeta,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageContentWrapper bgColor="bg-surfaceClr-2">
        <PageHeader>
          <h1 className="text-7xl font-bold text-textClr-1">Hello</h1>
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
  const recentPosts = getSliceOfPosts({ posts: sortedPosts });
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
