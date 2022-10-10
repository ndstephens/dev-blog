import fs from 'fs';
import path from 'path';

import { sync } from 'glob';
import matter from 'gray-matter';

import {
  Post,
  PostMeta,
  PostTopic,
  postTopics,
  PostType,
  postTypes,
} from 'src/postsApi/postConfig';

// TODO: create test to verify you don't have 2 or more posts with the same filename / slug
// TODO: create test to verify only topics from the "topic-list" exist (prevents misspellings and forgetting about newly created topics, etc)
// TODO: create similar test to check the "type" front-matter
// TODO: create test to check that all front-matter is included and has a valid value

const POSTS_PATH = path.join(process.cwd(), 'src', 'posts');

/* =============================================
              PRIMARY FUNCTIONS
============================================= */

// GET ALL POSTS
const getAllPosts = (): Post[] => {
  const allPostsPaths = getAllPostPaths();
  const allPosts = getAllPostsFromPathList(allPostsPaths).sort(sortPostsByDate);
  return allPosts;
};

// GET ALL POSTS BY TYPE
const getAllPostsByType = (type: PostType): Post[] => {
  const allPostPathsByType = getAllPostPathsByType(type);
  const allPostsByType =
    getAllPostsFromPathList(allPostPathsByType).sort(sortPostsByDate);
  return allPostsByType;
};

// GET ALL POSTS BY TOPIC
const getAllPostsByTopic = (topic: PostTopic): Post[] => {
  const allPostsPaths = getAllPostPaths();
  const allPosts = getAllPostsFromPathList(allPostsPaths);
  const allPostsByTopic = filterPostsByTopics([topic], allPosts).sort(
    sortPostsByDate
  );
  return allPostsByTopic;
};

/* =============================================
                UTIL FUNCTIONS
============================================= */

// GET ALL POST PATHS
const getAllPostPaths = (): string[] => {
  const pathList = sync(`${POSTS_PATH}/**/*.mdx`);
  return pathList;
};

// GET ALL POST PATHS BY TYPE
const getAllPostPathsByType = (type: PostType): string[] => {
  const pathList = sync(`${POSTS_PATH}/${type}/**/*.mdx`);
  return pathList;
};

// GET ALL POSTS FROM PATH LIST
const getAllPostsFromPathList = (pathList: string[]): Post[] => {
  const posts = pathList.map(getPostFromPath);
  return posts;
};

// GET POST FROM PATH
const getPostFromPath = (postPath: string): Post => {
  const source = fs.readFileSync(postPath);
  const post = matter(source);

  if (isPostLike(post)) {
    const { content, data } = post;
    return {
      content,
      meta: {
        slug: getSlugFromPath(postPath),
        title: data.title,
        description: data.description,
        date: data.date,
        type: data.type,
        topics: data.topics.sort(),
      },
    };
  } else {
    throw new Error('Post content and/or data is invalid');
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

// FILTER POSTS BY TOPICS
const filterPostsByTopics = (
  filterTopics: PostTopic[],
  posts: Post[]
): Post[] => {
  const postsByTopics = posts.filter((post) =>
    filterTopics.every((filterTopic) => post.meta.topics.includes(filterTopic))
  );
  return postsByTopics;
};

// VERIFY STRUCTURE AND DATA OF POST
interface PostLike {
  content: string;
  data: Omit<PostMeta, 'slug'>;
}
const isPostLike = (post: any): post is PostLike => {
  return (
    // POST
    post &&
    typeof post === 'object' &&
    // CONTENT
    'content' in post &&
    typeof post['content'] === 'string' &&
    // DATA (POST-META)
    'data' in post &&
    typeof post['data'] === 'object' &&
    // TITLE
    'title' in post['data'] &&
    typeof post['data']['title'] === 'string' &&
    // DESCRIPTION
    'description' in post['data'] &&
    typeof post['data']['description'] === 'string' &&
    // DATE
    'date' in post['data'] &&
    typeof post['data']['date'] === 'string' &&
    // TYPE
    'type' in post['data'] &&
    typeof post['data']['type'] === 'string' &&
    isValidPostType(post['data']['type']) &&
    // TOPICS
    'topics' in post['data'] &&
    typeof post['data']['topics'] === 'object' &&
    Array.isArray(post['data']['topics']) &&
    post['data']['topics'].every(isValidPostTopic)
  );
};
const isValidPostType = (type: string) => {
  return (postTypes as string[]).includes(type);
};
const isValidPostTopic = (topic: any) => {
  return typeof topic === 'string' && (postTopics as string[]).includes(topic);
};
