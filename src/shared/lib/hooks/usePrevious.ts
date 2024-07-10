import { useRef } from 'react';

export const usePrevious = <T>(value: T): T | null => {
  const currentRef = useRef<T>(value);
  const previousRef = useRef<T | null>(null);

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current;
    currentRef.current = value;
  }

  return previousRef.current;
};
