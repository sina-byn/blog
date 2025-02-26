import fs from 'fs';

// * types
type InlineScriptProps = { src: string };

const InlineScript = ({ src }: InlineScriptProps) => {
  if (!fs.existsSync(src)) {
    console.error(`Could not find '${src}'`);
    return null;
  }

  const script = fs.readFileSync(src, 'utf-8');
  return <script>{script}</script>;
};

export default InlineScript;
