import Link from 'next/link';

import { PostMeta } from '@scripts/posts/types';
import { capitalizeFirstLetter } from '@utils/strings';

interface PostPreviewProps {
  post: PostMeta;
}

export default function PostPreview({ post }: PostPreviewProps) {
  const { category, description, slug, title, topics } = post;

  return (
    <article className="flex flex-col gap-3">
      <Link href={`/${slug}`}>
        <a>
          <h3 className="text-2xl font-semibold tracking-wide transition-colors hover:text-primaryClr">
            {title}
          </h3>
        </a>
      </Link>
      <p className="font-medium">{description}</p>
      <div className="flex items-center leading-none">
        <div>
          <Link href={`/blog/${category}`}>
            <a className="font-semibold transition-colors hover:text-primaryClr">
              {category.toLocaleUpperCase()}
            </a>
          </Link>
        </div>
        <div className="mx-3 aspect-square w-[6px] rounded-full bg-textClr-1" />
        <ul className="flex gap-3">
          {topics.map((topic) => (
            <li key={topic}>
              <Link href={`/blog/latest?topic=${topic}`}>
                <a className="font-medium transition-colors hover:text-primaryClr-3">
                  {capitalizeFirstLetter(topic)}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
