import fs from 'fs/promises';

import fg from 'fast-glob';
import matter from 'gray-matter';
import { z } from 'zod';

import {
  Post,
  PostCategoriesSchema,
  PostCategory,
  PostTopic,
  PostTopicsSchema,
} from './types';

// TODO: create test to verify you don't have 2 or more posts with the same filename / slug

const POSTS_PATH = 'src/posts';

//* =============================================
//*               GET POST(S)                   =
//*==============================================
// GET ALL POSTS
export const getAllPosts = async (): Promise<Post[]> => {
  const allPostsPaths = await getAllPostPaths();
  const allPosts = await getAllPostsFromPathList(allPostsPaths);
  return allPosts;
};

// GET ALL POSTS BY CATEGORY
export const getAllPostsByCategory = async (
  category: PostCategory
): Promise<Post[]> => {
  const allPostPathsByCategory = await getAllPostPathsByPostCategory(category);
  const allPostsByCategory = await getAllPostsFromPathList(
    allPostPathsByCategory
  );
  return allPostsByCategory;
};

// GET POST FROM SLUG
// const getPostFromSlug = (slug: string): Post => {
//   const postPath = getAllPostPaths().find((path) =>
//     path.endsWith(`${slug}.mdx`)
//   );

//   if (!postPath) {
//     throw new Error('No post found for this slug');
//   }

//   return getPostFromPath(postPath);
// };

//* =============================================
//*             POST PATH UTILS                 =
//*==============================================
// GET ALL POST PATHS
const getAllPostPaths = async (): Promise<string[]> => {
  const pathList = await fg(`${POSTS_PATH}/**/*.mdx`);
  return pathList;
};

// GET ALL POST PATHS BY POST CATEGORY
const getAllPostPathsByPostCategory = async (
  category: PostCategory
): Promise<string[]> => {
  const pathList = await fg(`${POSTS_PATH}/${category}/**/*.mdx`);
  return pathList;
};

// GET ALL POSTS FROM PATH LIST
const getAllPostsFromPathList = async (pathList: string[]): Promise<Post[]> => {
  const posts = await Promise.all(pathList.map(getPostFromPath));
  return posts;
};

// GET POST FROM PATH
const getPostFromPath = async (postPath: string): Promise<Post> => {
  const slug = getSlugFromPath(postPath);
  const source = await fs.readFile(postPath);
  const postData = matter(source);

  try {
    return parsePost(postData, slug);
  } catch (err) {
    // what's the point of a try/catch here ??
    throw err;
  }
};

// GET SLUG FROM PATH
const getSlugFromPath = (postPath: string): string => {
  const pathParts = postPath.split('/');
  const fileName = pathParts[pathParts.length - 1];
  const slug = fileName.split('.')[0];
  return slug;
};

//* =============================================
//*        SORTING / FILTERING / ETC            =
//*==============================================
// SORT POSTS BY DATE - RECENT FIRST
export const sortPostsByDate = (a: Post, b: Post) => {
  if (a.meta.created < b.meta.created) return 1;
  if (a.meta.created > b.meta.created) return -1;
  return 0;
};

// EXTRACT POST META
export const extractPostMeta = (post: Post) => post.meta;

// GET ALL POST TOPICS IN USE
export const getAllPostTopicsInUse = (posts: Post[]): PostTopic[] => {
  return [...new Set<PostTopic>(posts.map((post) => post.meta.topics).flat())];
};

// FILTER POSTS BY TOPIC
// export const filterPostByTopic = (post: Post, topic: PostTopic) =>
//   post.meta.topics.includes(topic);

// export const filterPostsByTopics = (
//   posts: Post[],
//   topics: PostTopic[],
// ): Post[] => {
//   const postsByTopics = posts.filter((post) =>
//     topics.every((topic) => post.meta.topics.includes(topic))
//   );
//   return postsByTopics;
// };

//* =============================================
//*         TEST / VALIDATION FUNCTIONS         =
//*==============================================
// VERIFY STRUCTURE AND DATA-TYPES OF POST (gray-matter response)
const RawPostSchema = z.object({
  content: z.string().trim().min(1),
  data: z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().min(1),
    created: z.date().transform((date) => date.toISOString()),
    updated: z.date().transform((date) => date.toISOString()),
    category: PostCategoriesSchema,
    topics: z.array(PostTopicsSchema).min(1),
  }),
});
const parsePost = (postData: unknown, slug: string): Post => {
  const { content, data } = RawPostSchema.parse(postData);

  return {
    content,
    meta: {
      slug,
      ...data,
    },
  };
};
