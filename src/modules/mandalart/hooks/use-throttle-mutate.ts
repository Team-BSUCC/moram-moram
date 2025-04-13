import { UseMutateFunction } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';

/**
 * mutation.mutate를 delay 시간 동안 한 번만 실행되게 하는 함수
 * @param func useMutation에서 나온 mutate함수, 해당 mutate는 인자를 받지 않는 mutate
 * @param delay 쓰로틀링을 걸어줄 ms
 * @returns 리턴된 값을 useMemo를 사용하여 리렌더링 방지를 해주어야함. 안그러면 mutation이 리렌더링이 계속 되어 delay 이후에 함수 호출 한 만큼 재 호출됨!
 */
export const useThrottleMutate = (
  func: UseMutateFunction<void, Error, void, void>,
  delay: number
): (() => void) => {
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const throttleMutate = useCallback(() => {
    if (!timeoutIdRef.current) {
      timeoutIdRef.current = setTimeout(() => {
        func();
        timeoutIdRef.current = null;
      }, delay);
    }
  }, [func, delay]);

  return throttleMutate;
};
