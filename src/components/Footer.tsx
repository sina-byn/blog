import Link from 'next/link';

// * components
import ThemeSwitch from './ThemeSwitch';

// * icons
import { ArrowUpRight } from '@geist-ui/icons';

const Footer = () => {
  return (
    <footer className='flex items-center justify-between gap-x-4 max-w-prose mx-auto px-4 sm:px-0'>
      <nav className='flex items-center gap-x-6 text-sm dark:text-gray-400'>
        <Link
          rel='noopener nofollow noreferrer'
          href='https://github.com/sina-byn'
          className='flex items-center gap-x-1 dark:hover:text-white'
        >
          Github
          <ArrowUpRight size={18} />
        </Link>

        <Link
          rel='noopener nofollow noreferrer'
          href='https://www.linkedin.com/in/sina-bayandorian/'
          className='flex items-center gap-x-1 dark:hover:text-white'
        >
          Linkedin
          <ArrowUpRight size={18} />
        </Link>

        <Link
          rel='noopener nofollow noreferrer'
          href='https://github.com/sina-byn/blog'
          className='flex items-center gap-x-1 dark:hover:text-white'
        >
          Source
          <ArrowUpRight size={18} />
        </Link>
      </nav>

      <ThemeSwitch />
    </footer>
  );
};

export default Footer;
