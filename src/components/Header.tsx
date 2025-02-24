import Link from 'next/link';

// * components
import Search from './Search';

const Header = () => {
  return (
    <header className='flex items-center justify-between gap-x-4 max-w-prose mx-auto px-4 sm:px-0 my-10'>
      <nav className='flex flex-wrap items-center gap-x-6 gap-y-2 dark:text-neutral-200'>
        <Link href='/'>home</Link>
        <Link href='/blog'>blog</Link>
      </nav>

      <Search />
    </header>
  );
};

export default Header;
