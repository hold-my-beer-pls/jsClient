import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

export const useIds = () => {
  const { ids } = useParams();

  return useMemo(() => {
    const idList = ids?.split('get-');

    if (idList?.[1]) {
      return idList[1];
    }
  }, []);
};
