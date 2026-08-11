import { useRef, useEffect, useCallback } from 'react';

import { TimeoutReturn } from '@/types';

type DebounceCallback = (...args: any[]) => any;

export function useDebounce<T extends DebounceCallback>(callback: T, delay = 300) {
  const callbackRef = useRef<T>(callback);
  const timeoutRef = useRef<TimeoutReturn | null>(null);

  const debounced = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay],
  );

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debounced;
}
