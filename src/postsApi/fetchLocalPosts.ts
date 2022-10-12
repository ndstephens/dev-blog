import fs from 'fs/promises';

import fg from 'fast-glob';
import matter from 'gray-matter';

import {
  Post,
  PostTopic,
  postTopics,
  PostType,
  postTypes,
} from 'src/postsApi/postConfig';

// TODO: create test to verify you don't have 2 or more posts with the same filename / slug
// TODO: create test to verify only topics from the "topic-list" exist (prevents misspellings and forgetting about newly created topics, etc)
// TODO: create similar test to check the "type" front-matter
// TODO: create test to check that all front-matter is included and has a valid value

const POSTS_PATH = 'src/posts';

/* =============================================
              PRIMARY FUNCTIONS
============================================= */

// GET ALL POSTS
export const getAllPosts = async (): Promise<Post[]> => {
  const allPostsPaths = await getAllPostPaths();
  const allPosts = await getAllPostsFromPathList(allPostsPaths);
  const allPostsSorted = allPosts.sort(sortPostsByDate);
  return allPostsSorted;
};

// GET ALL POSTS BY TYPE
export const getAllPostsByType = async (type: PostType): Promise<Post[]> => {
  const allPostPathsByType = await getAllPostPathsByPostType(type);
  const allPostsByType = await getAllPostsFromPathList(allPostPathsByType);
  const allPostsByTypeSorted = allPostsByType.sort(sortPostsByDate);
  return allPostsByTypeSorted;
};

// FILTER POSTS BY TOPICS
export const filterPostsByTopics = (
  filterTopics: PostTopic[],
  posts: Post[]
): Post[] => {
  const postsByTopics = posts.filter((post) =>
    filterTopics.every((filterTopic) => post.meta.topics.includes(filterTopic))
  );
  return postsByTopics;
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

// GET ALL POSTS BY TOPIC
// const getAllPostsByTopic = async (topic: PostTopic): Promise<Post[]> => {
//   const allPostsPaths = getAllPostPaths();
//   const allPosts = getAllPostsFromPathList(allPostsPaths);
//   const allPostsByTopic = filterPostsByTopics([topic], allPosts).sort(
//     sortPostsByDate
//   );
//   return allPostsByTopic;
// };

/* =============================================
                UTIL FUNCTIONS
============================================= */

// GET ALL POST PATHS
const getAllPostPaths = async (): Promise<string[]> => {
  const pathList = await fg(`${POSTS_PATH}/**/*.mdx`);
  return pathList;
};

// GET ALL POST PATHS BY POST TYPE
const getAllPostPathsByPostType = async (type: PostType): Promise<string[]> => {
  const pathList = await fg(`${POSTS_PATH}/${type}/**/*.mdx`);
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
  const post = matter(source);

  try {
    if (isPostLike(post, slug)) {
      const { content, data } = post;
      return {
        content,
        meta: {
          slug,
          title: data.title,
          description: data.description,
          date: data.date.toISOString(),
          type: data.type,
          topics: data.topics.sort(),
        },
      };
    } else {
      throw new Error('Error parsing post data');
    }
  } catch (err) {
    throw err;
  }
};

// SORT POSTS BY DATE - RECENT FIRST
const sortPostsByDate = (a: Post, b: Post) => {
  if (a.meta.date < b.meta.date) return 1;
  if (a.meta.date > b.meta.date) return -1;
  return 0;
};

// GET SLUG FROM PATH
const getSlugFromPath = (postPath: string): string => {
  const pathParts = postPath.split('/');
  const fileName = pathParts[pathParts.length - 1];
  const slug = fileName.split('.')[0];
  return slug;
};

/* =============================================
          TEST / VALIDATION FUNCTIONS
============================================= */

// VERIFY STRUCTURE AND DATA-TYPES OF POST (gray-matter response)
interface PostLike {
  content: string;
  data: {
    title: string;
    description: string;
    date: Date;
    type: PostType;
    topics: PostTopic[];
  };
}
const isPostLike = (post: any, slug: string): post is PostLike => {
  // POST
  if (!post || typeof post !== 'object') {
    throw new Error(`${slug}: the post does not exist or can not be parsed`);
  }
  // CONTENT
  if (!('content' in post) || typeof post['content'] !== 'string') {
    throw new Error(`${slug}: post content does not exist or is not a string`);
  }
  // DATA (POST-META)
  if (!('data' in post) || typeof post['data'] !== 'object') {
    throw new Error(`${slug}: post-meta does not exist or is not an object`);
  }
  // TITLE
  if (!('title' in post['data']) || typeof post['data']['title'] !== 'string') {
    throw new Error(`${slug}: post title does not exist or is not a string`);
  }
  // DESCRIPTION
  if (
    !('description' in post['data']) ||
    typeof post['data']['description'] !== 'string'
  ) {
    throw new Error(
      `${slug}: post description does not exist or is not a string`
    );
  }
  // DATE
  if (!('date' in post['data']) || typeof post['data']['date'] !== 'object') {
    throw new Error(`${slug}: post date does not exist or is not a string`);
  }
  // TYPE
  if (
    !('type' in post['data']) ||
    typeof post['data']['type'] !== 'string' ||
    !isValidPostType(post['data']['type'])
  ) {
    throw new Error(
      `${slug}: post type does not exist, is not a string, or is not a valid PostType`
    );
  }
  // TOPICS
  if (
    !('topics' in post['data']) ||
    typeof post['data']['topics'] !== 'object' ||
    !Array.isArray(post['data']['topics']) ||
    post['data']['topics'].length <= 0 ||
    !post['data']['topics'].every(isValidPostTopic)
  ) {
    throw new Error(
      `${slug}: post topics do not exist, are not an array, or are not valid PostTopics`
    );
  }

  return true;
};
const isValidPostType = (type: string) => {
  return (postTypes as string[]).includes(type);
};
const isValidPostTopic = (topic: any) => {
  return typeof topic === 'string' && (postTopics as string[]).includes(topic);
};
