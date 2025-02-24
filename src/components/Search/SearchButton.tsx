'use client';

// * context
import { useSearch } from './SearchContext';

// * icons
import { Search } from '@geist-ui/icons';

// * types
type SearchButtonProps = { os?: string };

const SearchButton = ({ os }: SearchButtonProps) => {
  const normalizedOS = os?.replace(/\s/g, '-').toLowerCase();
  const { setOpen } = useSearch();

  const clickHandler = () => setOpen(true);

  return (
    <button
      type='button'
      onClick={clickHandler}
      className='flex items-center gap-x-2 rounded-full bg-neutral text-sm cursor-pointer p-2 lg:p-1.5'
    >
      <Search size={20} className='stroke-foreground' />

      <kbd className='hidden md:flex items-center bg-background hover:bg-neutral-400/40  text-xs border rounded px-1.5 py-0.5'>
        <kbd>{normalizedOS === 'mac-os' ? '⌘' : 'Ctrl'}</kbd>
        &nbsp;
        <kbd>K</kbd>
      </kbd>
    </button>
  );
};

export default SearchButton;
