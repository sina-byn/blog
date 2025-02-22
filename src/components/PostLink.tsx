import Link from 'next/link';

// * types
import type { Metadata } from '@/utils';

type PostLinkProps = Pick<Metadata, 'slug' | 'title' | 'publishedAt'>;

const PostLink = ({ slug, title, publishedAt }: PostLinkProps) => {
  return (
    <Link href={`/blog/${slug}`} className='grid lg:grid-cols-[auto_1fr] gap-x-4'>
      <time dateTime={publishedAt} className='text-neutral-600 dark:text-neutral-400'>
        {new Date(publishedAt).toLocaleDateString('en', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </time>

      <p>{title}</p>
    </Link>
  );
};

export default PostLink;
