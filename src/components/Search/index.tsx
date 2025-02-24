import Script from 'next/script';
import { headers } from 'next/headers';
import { userAgent } from 'next/server';

// * providers
import SearchContextProvider from './SearchContext';

// * components
import SearchPopup from './SearchPopup';
import SearchButton from './SearchButton';

const Search = async () => {
  const _headers = await headers();
  const { os } = userAgent({ headers: _headers });

  return (
    <SearchContextProvider>
      <div>
        {process.env.NODE_ENV !== 'development' && <Script src='/js/search.js' />}
        <SearchButton os={os.name} />
        <SearchPopup />
      </div>
    </SearchContextProvider>
  );
};

export default Search;
