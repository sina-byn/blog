// * constants
import { baseURL } from './sitemap';

export default function robots() {
  return {
    sitemap: `${baseURL}/sitemap.xml`,
    rules: [
      {
        userAgent: '*',
      },
    ],
  };
}
