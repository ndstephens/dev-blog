import type { PostMeta } from '@scripts/posts/types';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';

import { extractPostMeta, getAllPosts, sortPostsByDate } from '@scripts/posts';
import PageBody from '@ui/PageLayout/PageBody';
import PageHeader from '@ui/PageLayout/PageHeader';

export default function HomePage({
  postsMeta,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageHeader className="bg-surfaceClr-2">
        <h1 className="font-serif text-7xl font-bold tracking-wide text-textClr-1">
          Hello
        </h1>
      </PageHeader>

      <PageBody className="bg-surfaceClr-1">
        <section className="py-8">
          <ul>
            {postsMeta.map((postMeta) => (
              <li key={postMeta.title}>
                <pre>{JSON.stringify(postMeta, null, 2)}</pre>
              </li>
            ))}
          </ul>
        </section>
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
