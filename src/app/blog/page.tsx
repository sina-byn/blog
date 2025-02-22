// * utils
import { getPosts } from '@/utils';

// * components
import PostLink from '@/components/PostLink';

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
          <PostLink {...metadata} />
        ))}
      </section>
    </main>
  );
};

export default Blog;
