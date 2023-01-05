import type { PostMeta } from '@scripts/posts/types';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';

// import PostPreview from '@ui/PostPreview';
import { extractPostMeta, getAllPosts, sortPostsByDate } from '@scripts/posts';
import PageContentWrapper from '@ui/PageLayout/PageContentWrapper';
import PageHeader from '@ui/PageLayout/PageHeader';

export default function HomePage({
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
  const postsMeta = sortedPosts.map(extractPostMeta);

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
