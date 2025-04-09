import { UseMutateFunction } from '@tanstack/react-query';

export const throttleMutate = (
  func: UseMutateFunction<void, Error, void, void>,
  delay: number
): (() => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function () {
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        func();
        timeoutId = null;
      }, delay);
    }
  };
};
