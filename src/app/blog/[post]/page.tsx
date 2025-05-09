// * utils
import { omitKeys, getPost, getPosts, calculateReadTime, type Metadata } from '@/utils';

// * components
import CustomMDX from '@/components/CustomMDX';

// * icons
import { Clock } from '@geist-ui/icons';

// * types
type PostProps = { params: Promise<{ post: string }> };

export const generateMetadata = async ({ params }: PostProps) => {
  const { post } = await params;
  const [metadata] = getPost(post);

  const withOmitMetadata = omitKeys<Metadata>(metadata, ['slug', 'publishedAt']);

  return withOmitMetadata;
};

export async function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ post: slug }));
}

const Post = async ({ params }: PostProps) => {
  const { post } = await params;
  const [metadata, mdx] = getPost(post);
  const readTime = calculateReadTime(mdx);

  return (
    <main className='prose dark:prose-invert dark:prose-headings:text-gray-300 dark:text-gray-300 mx-auto px-4 sm:px-0'>
      <hgroup>
        <h1>{metadata.title}</h1>
        <p>{metadata.description}</p>
      </hgroup>

      {readTime !== 0 && (
        <div className='flex items-center gap-x-2'>
          <Clock size={16} className='stroke-neutral-600 dark:stroke-neutral-400' />
          <span className='text-sm text-neutral-600 dark:text-neutral-400'>
            {readTime} min. read
          </span>
        </div>
      )}

      <hr />

      <article>
        <CustomMDX source={mdx} />
      </article>
    </main>
  );
};

export default Post;
