import fg from 'fast-glob';

// * utils
import { getPosts } from '@/utils';

// * constants
export const baseURL = 'https://sina-bayan.vercel.app'; // ! no-trailing slash

export default async function sitemap() {
  const posts = getPosts().map(({ slug, publishedAt }) => ({
    url: `${baseURL}/blog/${slug}`,
    lastModified: new Date(publishedAt).toISOString(),
  }));

  const appPages = fg
    .globSync(['./src/app/**/page.tsx', '!./src/app/blog/[post]/page.tsx'])
    .map(page => {
      const url = baseURL + page.replace('./src/app', '').replace(/\/page.tsx/g, '');
      return { url };
    });

  return [...appPages, ...posts];
}
