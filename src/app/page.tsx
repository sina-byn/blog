// * components
import PostList from '@/components/PostList';

const LandingPage = () => {
  return (
    <main className='max-w-prose mx-auto px-4 sm:px-0'>
      <hgroup className='prose dark:prose-invert mb-12'>
        <h1>Sina Bayandorian</h1>

        {/* eslint-disable */}
        <p>
          I'm a front-end developer specializing in React and Vue, with a strong interest in
          exploring the depths of Node.js. I believe in expanding my tech stack—why not code in Go?
          I also have a deep appreciation for C++ and am eager to dive into Rust. Well, isn't that a
          lot to learn? Then let's get started right away, as time is short.
        </p>
        {/* eslint-enable */}

        <hr />
      </hgroup>

      <PostList limit={5} />
    </main>
  );
};

export default LandingPage;
