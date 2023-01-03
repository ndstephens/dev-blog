import { z } from 'zod';

/* =============================================
                  CONFIG
============================================= */
export const PostCategoriesSchema = z.enum(['articles', 'notes', 'snippets']);

export const PostTopicsSchema = z.enum([
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
]);

const PostMetaSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  created: z.string(),
  updated: z.string(),
  category: PostCategoriesSchema,
  topics: z.array(PostTopicsSchema),
});

const PostSchema = z.object({
  content: z.string(),
  meta: PostMetaSchema,
});

/* =============================================
                  TYPES
============================================= */
export type PostCategory = z.infer<typeof PostCategoriesSchema>;

export type PostTopic = z.infer<typeof PostTopicsSchema>;

export type PostMeta = z.infer<typeof PostMetaSchema>;

export type Post = z.infer<typeof PostSchema>;
