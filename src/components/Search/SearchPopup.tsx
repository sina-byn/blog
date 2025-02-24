'use client';

import Link from 'next/link';

import { createPortal } from 'react-dom';
import { useRef, useState, useEffect } from 'react';

// * hooks
import useClient from '@/hooks/useClient';

// * context
import { useSearch } from './SearchContext';

// * icons
import { File } from '@geist-ui/icons';

// * constants
const EVENT_NAME = 'pagefind:instance';

const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';

let search: (query: string) => Promise<SearchResult>;

// * types
type SearchResult = null | { results: { data: () => Promise<SearchResultData> }[] };

type SearchResultData = {
  url: string;
  excerpt: string;
  meta: { title: string };
};


declare global {
  // eslint-disable-next-line no-var
  var search: (query: string) => Promise<SearchResult>;
}

const SearchPopup = () => {
  const [searchResult, setSearchResult] = useState<SearchResultData[]>([]);
  const { open, setOpen } = useSearch();
  const client = useClient();

  const initialized = useRef<boolean>(false);

  const toggleHandler = () => setOpen(prev => !prev);

  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (IS_DEVELOPMENT) return;
    const result = await search(e.currentTarget.value);
    if (!result) return;

    const { results } = result;
    setSearchResult(await Promise.all(results.map(r => r.data())));
  };

  useEffect(() => {
    if (IS_DEVELOPMENT) return;

    (async () => {
      try {
        const pagefindHandler = () => {
          initialized.current = true;
          search = window.search;
        };

        window.addEventListener(EVENT_NAME, pagefindHandler);

        return () => window.removeEventListener(EVENT_NAME, pagefindHandler);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return client
    ? createPortal(
        open ? (
          <div className='popup stack items-center justify-items-center fixed inset-0 isolate z-30 w-full'>
            <div onClick={toggleHandler} className='backdrop size-full bg-black/60' />

            <div className='h-[calc(100%_-_200px)] w-full max-w-prose pointer-events-none px-4'>
              <div className='w-full h-fit bg-background border dark:border-current/50 rounded-xl pointer-events-auto'>
                <header className='flex items-center justify-between gap-x-2 p-3'>
                  <input
                    type='text'
                    onChange={changeHandler}
                    ref={input => input?.focus()}
                    placeholder='What are you searching for ?'
                    className='grow bg-transparent text-lg placeholder:text-neutral-lighter focus:outline-none'
                  />

                  <button
                    onClick={toggleHandler}
                    className='shrink-0 bg-background hover:bg-neutral-400/40 text-xs border rounded shadow-md cursor-pointer px-1.5 py-0.5'
                  >
                    <kbd className='hidden md:inline-block'>Esc</kbd>
                    <span className='md:hidden'>Cancel</span>
                  </button>
                </header>

                {IS_DEVELOPMENT && (
                  <div className='text-center border-t dark:border-current/50 p-1.5 py-10'>
                    Search is only available in production builds. Try building and previewing the
                    site to test it out locally.
                  </div>
                )}

                {!IS_DEVELOPMENT && searchResult.length > 0 && (
                  <div className='border-t dark:border-current/50 p-1.5'>
                    {searchResult.map(({ url, excerpt, meta: { title } }) => {
                      return (
                        <div key={url} className='border-b last:border-b-0 py-1'>
                          <Link
                            href={url}
                            onClick={toggleHandler}
                            className='flex items-center gap-x-3 rounded-md capitalize hover:bg-white/10 px-1.5 py-2'
                          >
                            <File size={20} strokeWidth={1.5} className='shrink-0 -mt-0.5' />

                            <div>
                              <div>{title}</div>
                              <p
                                className='text-sm text-neutral'
                                dangerouslySetInnerHTML={{ __html: excerpt }}
                              />
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null,
        document.getElementById('popup-root')!
      )
    : null;
};

export default SearchPopup;
