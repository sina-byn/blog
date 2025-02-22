import fs from 'fs';
import url from 'url';
import path from 'path';

import { notFound } from 'next/navigation';

import fm from 'front-matter';

// * types
export type Metadata = { slug: string; title: string; publishedAt: string; description: string };

// * constants
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const __postsdir = path.resolve(__dirname, '..', 'app', 'blog', 'posts');

export const getPost = (post: string): [Metadata, string] => {
  const postPath = path.resolve(__postsdir, `${post}.mdx`);
  if (!fs.existsSync(postPath)) notFound();

  const mdx = fs.readFileSync(postPath, 'utf-8');
  const { attributes, body } = fm<Omit<Metadata, 'slug'>>(mdx);

  const metadata: Metadata = { ...attributes, slug: post };

  return [metadata, body];
};

export const getPosts = (limit?: number) => {
  const posts = fs.readdirSync(__postsdir, 'utf-8');

  return posts
    .map(post => getPost(path.parse(post).name)[0])
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit ? limit : posts.length);
};

export const calculateReadTime = (text: string) => {
  return Math.round(text.replace(/#{}\(\),\.!?\*_/g, '').split(/\s+/).length / 200);
};
