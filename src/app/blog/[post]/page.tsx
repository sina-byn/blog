// * utils
import CustomMDX from '@/components/CustomMDX';
import { getPost } from '@/utils';

// * types
type PostProps = { params: Promise<{ post: string }> };

export async function generateStaticParams() {
  return [{}];
}

const Post = async ({ params }: PostProps) => {
  const { post } = await params;
  const [metadata, mdx] = getPost(post);

  return (
    <main className='prose dark:prose-invert mx-auto px-4 sm:px-0'>
      <hgroup>
        <h1>{metadata.title}</h1>
        <p>{metadata.description}</p>
      </hgroup>

      <hr />

      <article>
        <CustomMDX source={mdx} />
      </article>
    </main>
  );
};

export default Post;
