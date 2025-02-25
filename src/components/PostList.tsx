import React from 'react';
import Link from 'next/link';

// * utils
import { getPosts, formatDate } from '@/utils';

// * types
type PostListProps = { limit?: number };

const PostList = ({ limit }: PostListProps) => {
  const posts = getPosts(limit);

  return (
    <section className='grid lg:grid-cols-[auto_1fr] gap-y-6 gap-x-4'>
      {posts.map(({ slug, title, publishedAt }) => (
        <React.Fragment key={slug}>
          <time
            dateTime={publishedAt}
            className='text-neutral-600 dark:text-neutral-400 -mb-4 lg:mb-0'
          >
            {formatDate(publishedAt)}
          </time>

          <Link href={`/blog/${slug}`}>
            <p>{title}</p>
          </Link>
        </React.Fragment>
      ))}
    </section>
  );
};

export default PostList;
