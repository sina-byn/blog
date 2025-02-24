'use client';

import { use, useState, useEffect, createContext, type Dispatch, type SetStateAction } from 'react';

// * context
const searchContext = createContext<SearchContext | null>(null);

// * types
type SearchContextProviderProps = { children: React.ReactNode };

type SearchContext = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const context = { open, setOpen };

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(true);
        return;
      }

      if (e.key.toLowerCase() === 'escape') setOpen(false);
    };

    window.addEventListener('keydown', keyDownHandler);

    return () => window.removeEventListener('keydown', keyDownHandler);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', open);
  }, [open]);

  return <searchContext.Provider value={context}>{children}</searchContext.Provider>;
};

export const useSearch = () => {
  const context = use(searchContext);

  if (!context) {
    throw new Error("'useSearch' should be called inside the scope of <SearchContextProvider />");
  }

  return context;
};

export default SearchContextProvider;
