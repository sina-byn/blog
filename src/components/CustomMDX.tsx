import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';

// * types
type CustomMDXProps = Source;

type Source = Pick<MDXRemoteProps, 'source'>;

const CustomMDX = ({ source }: CustomMDXProps) => {
  return <MDXRemote source={source} components={{}} />;
};

export default CustomMDX;
