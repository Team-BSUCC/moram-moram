import { UseMutateFunction } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';

/**
 * 인자를 받는 mutation에 쓰로틀링 적용
 * @param func useMutation에서 나온 mutate 함수 (TodoBroadCastType을 인자로 받는 mutate)
 * @param delay 쓰로틀링 딜레이(ms)
 * @returns 쓰로틀링된 mutation 호출 함수
 */
export const useThrottleMutateWithTrailing = <T>(
  func: UseMutateFunction<void, Error, T, void>,
  delay: number
): ((data: T) => void) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastArgsRef = useRef<T | null>(null);
  const isThrottlingRef = useRef(false);

  const throttledFn = useCallback(
    (data: T) => {
      if (!isThrottlingRef.current) {
        func(data);
        isThrottlingRef.current = true;

        timeoutRef.current = setTimeout(() => {
          if (lastArgsRef.current) {
            func(lastArgsRef.current);
            lastArgsRef.current = null;
          }
          isThrottlingRef.current = false;
        }, delay);
      } else {
        lastArgsRef.current = data;
      }
    },
    [func, delay]
  );

  return throttledFn;
};
