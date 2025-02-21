import fs from 'fs';

// * types
type InlineScriptProps = { src: string };

const InlineScript = ({ src }: InlineScriptProps) => {
  if (!fs.existsSync(src)) throw new Error(`Could not find '${src}'`);

  const script = fs.readFileSync(src, 'utf-8');
  return <script>{script}</script>;
};

export default InlineScript;
