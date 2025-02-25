// * components
import PostList from '@/components/PostList';

const LandingPage = () => {
  return (
    <main className='max-w-prose mx-auto px-4 sm:px-0'>
      <hgroup className='prose dark:prose-invert mb-12'>
        <h1>Sina Bayandorian</h1>
        <p></p>

        <hr />
      </hgroup>

      <PostList limit={5} />
    </main>
  );
};

export default LandingPage;
