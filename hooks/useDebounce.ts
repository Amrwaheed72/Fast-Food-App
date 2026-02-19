import { useEffect, useState } from 'react';

export const useDebounce = (query: string, delay: number) => {
  const [debounced, setDebounced] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(query);
    }, delay);
    return () => clearTimeout(timer);
  }, [query, delay]);
  return debounced;
};
