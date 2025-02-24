import { ImageResponse } from 'next/og';

// * utils
import { getPost, getPosts } from '@/utils';

// * types
type ImageProps = { params: Promise<{ post: string }> };

export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = "Sina Bayandorian's Blog Post";

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return getPosts().map(({ slug }) => ({ post: slug }));
}

const Image = async ({ params }: ImageProps) => {
  const { post } = await params;
  const [metadata] = getPost(post);
  const { title, publishedAt } = metadata;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'black',
          color: 'white',
          fontSize: 48,
          padding: '5rem',
        }}
      >
        <p style={{ flexGrow: 1 }}>{title}</p>

        <p style={{ fontSize: 28 }}>Sina Bayandorian</p>
        <p style={{ fontSize: 24, marginTop: -40 }}>
          {new Date(publishedAt).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>
    ),
    { ...size }
  );
};

export default Image;
