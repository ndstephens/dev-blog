// interface PostPageProps {}

import { getAllPostPaths } from 'src/api/localPosts';

// export function PostPage({ props }: PostPageProps) {
//   return (jsx)
// }
export function PostPage() {
  return <h1>PostPage</h1>;
}

export const getStaticProps = () => {
  const paths = getAllPostPaths();

  return { props: { paths } };
};
