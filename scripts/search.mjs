import fs from 'fs';
import fg from 'fast-glob';
import * as pagefind from 'pagefind';

const { index } = await pagefind.createIndex();

const pages = fg.globSync('./.next/server/app/**/[^_]*.html');

for (const page of pages) {
  const content = fs.readFileSync(page, 'utf-8');
  const url = page.replace('./.next/server/app', '').replace(/index|\.html/g, '') || '/';

  index.addHTMLFile({ url, content });
}

const { errors } = await index.writeFiles({ outputPath: './public/_pagefind' });

if (errors && errors.length) errors.forEach(error => console.error(error));
