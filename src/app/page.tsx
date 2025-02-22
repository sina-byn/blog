// * utils
import { getPosts } from '@/utils';

// * components
import PostLink from '@/components/PostLink';

const LandingPage = () => {
  const posts = getPosts(5);

  return (
    <main className='max-w-prose mx-auto px-4 sm:px-0'>
      <hgroup className='prose dark:prose-invert mb-12'>
        <h1>Sina Bayandorian</h1>
        <p></p>

        <hr />
      </hgroup>

      <section>
        <div className='space-y-6'>
          {posts.map(metadata => (
            <PostLink key={metadata.slug} {...metadata} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
