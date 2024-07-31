import { useState, useEffect } from 'react';

const useSearchQuery = (
  initialQuery: string = ''
): [string, (query: string) => void] => {
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    return localStorage.getItem('searchTerm') || initialQuery;
  });

  useEffect(() => {
    return () => {
      localStorage.setItem('searchTerm', searchQuery);
    };
  }, [searchQuery]);

  return [searchQuery, setSearchQuery];
};

export default useSearchQuery;
