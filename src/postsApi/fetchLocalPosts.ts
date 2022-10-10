import fs from 'fs';
import path from 'path';

import { sync } from 'glob';
import matter from 'gray-matter';

import { Post, PostCategory, PostMeta, PostTag } from 'src/postsApi/postConfig';

// TODO: create test to verify you don't have 2 or more posts with the same filename / slug
// TODO: create test to verify only tags from the "tag-list" exist (prevents misspellings and forgetting about newly created tags, etc)
// TODO: create similar test to check the "category" front-matter
// TODO: create test to check that all front-matter is included and has a valid value

const POSTS_PATH = path.join(process.cwd(), 'src', 'posts');

/* =============================================
              PRIMARY FUNCTIONS
============================================= */

// GET ALL POSTS
const getAllPosts = (): Post[] => {
  const allPostsPaths = getAllPostPaths();
  const allPosts = getPostsFromPathList(allPostsPaths).sort(sortPostsByDate);
  return allPosts;
};

// GET ALL POSTS BY CATEGORY
const getAllPostsByCategory = (category: PostCategory): Post[] => {
  const postPathsByCategory = getPostPathsByCategory(category);
  const allPostsByCategory =
    getPostsFromPathList(postPathsByCategory).sort(sortPostsByDate);
  return allPostsByCategory;
};

// GET ALL POSTS BY TAG
const getAllPostsByTag = (tag: PostTag): Post[] => {
  const allPostsPaths = getAllPostPaths();
  const allPosts = getPostsFromPathList(allPostsPaths);
  const allPostsByTag = filterPostsByTags([tag], allPosts).sort(
    sortPostsByDate
  );
  return allPostsByTag;
};

/* =============================================
                UTIL FUNCTIONS
============================================= */

// GET ALL POST PATHS
const getAllPostPaths = (): string[] => {
  const pathList = sync(`${POSTS_PATH}/**/*.mdx`);
  return pathList;
};

// GET POST PATHS BY CATEGORY
const getPostPathsByCategory = (category: PostCategory): string[] => {
  const pathList = sync(`${POSTS_PATH}/${category}/**/*.mdx`);
  return pathList;
};

// GET POSTS FROM PATH LIST
const getPostsFromPathList = (pathList: string[]): Post[] => {
  const posts = pathList.map(getPostFromPath);
  return posts;
};

// GET POST FROM PATH
const getPostFromPath = (postPath: string): Post => {
  const source = fs.readFileSync(postPath);
  const { content, data } = matter(source);

  if (
    data.title &&
    data.excerpt &&
    data.date &&
    data.category &&
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
        category: data.category as PostCategory,
        tags: (data.tags as PostTag[]).sort(),
      },
    };
  } else {
    throw new Error('Post missing meta data');
  }
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

// GET SLUG FROM PATH
const getSlugFromPath = (postPath: string): string => {
  const pathParts = postPath.split('/');
  const fileName = pathParts[pathParts.length - 1];
  const slug = fileName.split('.')[0];
  return slug;
};

// SORT POSTS BY DATE - RECENT FIRST
const sortPostsByDate = (a: Post, b: Post) => {
  if (a.meta.date < b.meta.date) return 1;
  if (a.meta.date > b.meta.date) return -1;
  return 0;
};

// FILTER POSTS BY TAGS
const filterPostsByTags = (filterTags: PostTag[], posts: Post[]): Post[] => {
  const postsByTags = posts.filter((post) =>
    filterTags.every((filterTag) => post.meta.tags.includes(filterTag))
  );
  return postsByTags;
};
