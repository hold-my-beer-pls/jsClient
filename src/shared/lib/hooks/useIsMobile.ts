import { useEffect, useState } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);

  useEffect(() => {
    const matchQueryList = window.matchMedia('(max-width: 768px)');

    function handleChange(e: MediaQueryListEvent) {
      setIsMobile(e.matches);
    }

    matchQueryList.addEventListener('change', handleChange);
    return () => {
      matchQueryList.removeEventListener('change', handleChange);
    };
  }, []);

  return isMobile;
};
