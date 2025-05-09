import type { Metadata } from 'next';

// * components
import PostList from '@/components/PostList';

export const metadata: Metadata = {
  title: 'Blog',
};

const Blog = () => {
  return (
    <main className='max-w-prose mx-auto px-4 sm:px-0'>
      <header className='prose dark:prose-invert dark:prose-headings:text-gray-300 dark:text-gray-300 mb-12'>
        <h1>My Blog</h1>

        <hr />
      </header>

      <PostList />
    </main>
  );
};

export default Blog;
