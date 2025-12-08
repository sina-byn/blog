import Link from 'next/link';

import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';

// * plugins
import remarkToc from 'remark-toc';

import { highlight } from 'sugar-high';

// * types
type CustomMDXProps = Source;

type Source = Pick<MDXRemoteProps, 'source'>;

type CodeProps = { children: string };

type AnchorProps = React.ComponentProps<'a'>;

const CustomMDX = ({ source }: CustomMDXProps) => {
  return (
    <MDXRemote
      source={source}
      options={{
        mdxOptions: { remarkPlugins: [[remarkToc, { heading: 'Table of Contents', maxDepth: 3 }]] },
      }}
      components={{
        code: ({ children }: CodeProps) => {
          return <code dangerouslySetInnerHTML={{ __html: highlight(children) }} />;
        },
        a: ({ href = '#', children, ...props }: AnchorProps) => {
          const isRelative = !href?.startsWith('http');

          return isRelative ? (
            <Link href={href} {...props}>
              {children}
            </Link>
          ) : (
            <a href={href} {...props} target='_blank' rel='noopener nofollow noreferrer'>
              {children}
            </a>
          );
        },
      }}
    />
  );
};

export default CustomMDX;
