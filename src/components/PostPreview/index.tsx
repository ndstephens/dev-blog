import { PostMeta } from 'src/postsApi/postConfig';

interface PostPreviewProps {
  postMeta: PostMeta;
}

export default function PostPreview({ postMeta }: PostPreviewProps) {
  return (
    <article>
      <pre>{JSON.stringify(postMeta, null, 2)}</pre>
    </article>
  );
}
