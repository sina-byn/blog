import Link from 'next/link';

const Header = () => {
  return (
    <header className='max-w-prose mx-auto px-4 sm:px-0 my-10'>
      <nav className='flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-200'>
        <Link href='/'>home</Link>
        <Link href='/blog'>blog</Link>
      </nav>
    </header>
  );
};

export default Header;
