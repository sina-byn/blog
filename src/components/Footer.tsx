import Link from 'next/link';

// * pkg
import pkg from '@/../package.json';

// * components
import ThemeSwitch from './ThemeSwitch';

// * icons
import { ArrowUpRight } from '@geist-ui/icons';

const Footer = () => {
  return (
    <footer className='max-w-prose mx-auto px-4 sm:px-0 mt-10'>
      <div className='flex items-center justify-between gap-x-4'>
        <nav className='flex items-center gap-x-6 text-sm dark:text-gray-400'>
          <Link
            target='_blank'
            rel='noopener nofollow noreferrer'
            href='https://github.com/sina-byn'
            className='flex items-center gap-x-1 dark:hover:text-white'
          >
            Github
            <ArrowUpRight size={18} />
          </Link>

          <Link
            target='_blank'
            rel='noopener nofollow noreferrer'
            href='https://www.linkedin.com/in/sina-bayandorian/'
            className='flex items-center gap-x-1 dark:hover:text-white'
          >
            Linkedin
            <ArrowUpRight size={18} />
          </Link>

          <Link
            target='_blank'
            rel='noopener nofollow noreferrer'
            href='https://github.com/sina-byn/blog'
            className='flex items-center gap-x-1 dark:hover:text-white'
          >
            Source
            <ArrowUpRight size={18} />
          </Link>
        </nav>

        <ThemeSwitch />
      </div>

      {pkg?.license === 'MIT' && (
        <div className='text-sm text-neutral-600 lg:text-neutral-400 mt-4 pb-32'>
          &copy; {new Date().getFullYear()} {pkg.license} Licensed
        </div>
      )}
    </footer>
  );
};

export default Footer;
