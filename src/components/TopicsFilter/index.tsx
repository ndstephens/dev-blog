import type { PostCategory, PostTopic } from '@scripts/posts/types';

import Link from 'next/link';

import clsx from 'clsx';

import { capitalizeFirstLetter } from '@utils/strings';

interface TopicsFilterProps {
  currentTopic: PostTopic | undefined;
  topics: PostTopic[];
  category: PostCategory | 'latest';
  className?: string;
}

export default function TopicsFilter({
  currentTopic,
  topics,
  category,
  className,
}: TopicsFilterProps) {
  return (
    <div className={className}>
      <h2 className="text-lg font-semibold uppercase tracking-wider text-primaryClr">
        Filter by Topic
      </h2>
      <ul className="mt-3 flex flex-wrap gap-3">
        {topics.map((topic) => {
          const isActiveTopic = topic === currentTopic;
          return (
            <li key={topic}>
              <Link
                href={
                  currentTopic === topic
                    ? category
                    : `${category}/?topic=${topic}`
                }
              >
                <a
                  className={clsx(
                    'inline-block rounded border border-textClr-1 px-4 py-2 font-medium text-textClr-1 transition-all hover:rounded-xl',
                    isActiveTopic && 'text-primaryClr-3',
                    !!currentTopic && !isActiveTopic && 'text-textClr-3'
                  )}
                >
                  {capitalizeFirstLetter(topic)}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
