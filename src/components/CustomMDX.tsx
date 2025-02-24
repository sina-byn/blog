import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';

// * plugins
import remarkToc from 'remark-toc';

import { highlight } from 'sugar-high';

// * types
type CustomMDXProps = Source;

type Source = Pick<MDXRemoteProps, 'source'>;

type CodeProps = { children: string };

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
      }}
    />
  );
};

export default CustomMDX;
