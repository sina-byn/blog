import fs from 'fs';
import url from 'url';
import path from 'path';

import { notFound } from 'next/navigation';

import fm from 'front-matter';

// * types
type Metadata = { title: string; description: string };

// * constants
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const __postsdir = path.resolve(__dirname, '..', 'app', 'blog', 'posts');

export const getPost = (post: string): [Metadata, string] => {
  const postPath = path.resolve(__postsdir, `${post}.mdx`);
  if (!fs.existsSync(postPath)) notFound();

  const mdx = fs.readFileSync(postPath, 'utf-8');
  const { attributes, body } = fm<Metadata>(mdx);

  return [attributes, body];
};
