import fs from 'fs';
import path from 'path';

import { sync } from 'glob';
import matter from 'gray-matter';

import { Post, PostMeta } from 'src/api/postTypes';

// TODO: create test to verify you don't have 2 or more posts with the same filename / slug

const POSTS_PATH = path.join(process.cwd(), 'src', 'posts');

// GET ALL POST PATHS
export const getAllPostPaths = (): string[] => {
  const paths = sync(`${POSTS_PATH}/**/*.mdx`);
  return paths;
};

// GET ALL POSTS
export const getAllPostS = (): Post[] => {
  const posts = getAllPostPaths()
    .map((path) => getPostFromPath(path))
    .sort((a, b) => {
      if (a.meta.date < b.meta.date) return 1;
      if (a.meta.date > b.meta.date) return -1;
      return 0;
    });
  return posts;
};

// GET SLUG FROM PATH
const getSlugFromPath = (postPath: string): string => {
  const pathParts = postPath.split('/');
  const fileName = pathParts[pathParts.length - 1];
  const slug = fileName.split('.')[0];
  return slug;
};

// GET POST FROM PATH
export const getPostFromPath = (postPath: string): Post => {
  const source = fs.readFileSync(postPath);
  const { content, data } = matter(source);

  if (
    data.title &&
    data.excerpt &&
    data.date &&
    data.tags &&
    Array.isArray(data.tags)
  ) {
    return {
      content,
      meta: {
        slug: getSlugFromPath(postPath),
        title: data.title as string,
        excerpt: data.excerpt as string,
        date: data.date as string,
        tags: data.tags as string[],
      },
    };
  } else {
    throw new Error('Post missing meta data');
  }
};

// GET POST FROM SLUG
export const getPostFromSlug = (slug: string): Post => {
  const postPath = getAllPostPaths().find((path) =>
    path.endsWith(`${slug}.mdx`)
  );

  if (!postPath) {
    throw new Error('No post found for this slug');
  }

  return getPostFromPath(postPath);
};
