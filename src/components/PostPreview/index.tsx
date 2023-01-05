import { PostMeta } from '@scripts/posts/types';

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
