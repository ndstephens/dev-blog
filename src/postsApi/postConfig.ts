/* =============================================
              CATEGORIES - TAGS
============================================= */
export const categories: PostCategory[] = ['notes', 'quickies', 'snippets'];

export const tags: PostTag[] = [
  'typescript',
  'react',
  'redux',
  'next',
  'javascript',
  'git',
  'css',
  'animation',
  'framer-motion',
  'styled-components',
  'testing',
  'accessibility',
];

/* =============================================
                  TYPES
============================================= */
export interface Post {
  content: string;
  meta: PostMeta;
}

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: PostCategory;
  tags: PostTag[];
}

export type PostCategory = 'notes' | 'quickies' | 'snippets';

export type PostTag =
  | 'typescript'
  | 'react'
  | 'redux'
  | 'next'
  | 'javascript'
  | 'git'
  | 'css'
  | 'animation'
  | 'framer-motion'
  | 'styled-components'
  | 'testing'
  | 'accessibility';
