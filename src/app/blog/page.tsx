import type { Metadata } from 'next';

// * utils
import { getPosts } from '@/utils';

// * components
import PostLink from '@/components/PostLink';

export const metadata: Metadata = {
  title: 'Blog',
};

const Blog = () => {
  const posts = getPosts();

  return (
    <main className='max-w-prose mx-auto px-4 sm:px-0'>
      <header className='prose dark:prose-invert mb-12'>
        <h1>My Blog</h1>

        <hr />
      </header>

      <section className='space-y-6'>
        {posts.map(metadata => (
          <PostLink key={metadata.slug} {...metadata} />
        ))}
      </section>
    </main>
  );
};

export default Blog;
