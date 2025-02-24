(async () => {
    try {
      const pagefind = await import('/_pagefind/pagefind.js');
      window.search = query => pagefind.debouncedSearch(query, {}, 300);
  
      const event = new CustomEvent('pagefind:instance');
      dispatchEvent(event);
    } catch (err) {
      const { message = '' } = err;
  
      if (message.startsWith('Failed to fetch dynamically imported module')) {
        throw new Error("Could not find Pagefind index. Run 'npm run index' to generate it.");
      }
  
      console.error(err);
    }
  })();
  