/* =============================================
            POST TYPES AND TOPICS
============================================= */
export const postTypes: PostType[] = ['notes', 'snippets'];

export const postTopics: PostTopic[] = [
  'accessibility',
  'animation',
  'css',
  'git',
  'javascript',
  'next',
  'performance',
  'react',
  'state',
  'testing',
  'typescript',
];

/* =============================================
                  TS-TYPES
============================================= */
export interface Post {
  content: string;
  meta: PostMeta;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  type: PostType;
  topics: PostTopic[];
}

export type PostType = 'notes' | 'snippets';

export type PostTopic =
  | 'accessibility'
  | 'animation'
  | 'css'
  | 'git'
  | 'javascript'
  | 'next'
  | 'performance'
  | 'react'
  | 'state'
  | 'testing'
  | 'typescript';
