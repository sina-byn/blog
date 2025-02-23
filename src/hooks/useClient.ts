import { useState, useEffect } from 'react';

const useClient = () => {
  const [client, setClient] = useState<boolean>(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return client;
};

export default useClient;
