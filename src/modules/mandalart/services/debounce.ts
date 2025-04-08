/* eslint-disable no-unused-vars */
type DebouncedMutate<T> = {
  (variables: T): Promise<void>;
  cancel: () => void;
};

const debounceMutate = <T>(
  mutateFn: (variables: T) => Promise<void>,
  delay: number
): DebouncedMutate<T> => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let latestVars: T;
  let pending = false;

  const debouncedFn = async function (variables: T) {
    latestVars = variables;

    if (pending) return;

    pending = true;

    return new Promise<void>((resolve, reject) => {
      timeoutId = setTimeout(async () => {
        try {
          await mutateFn(latestVars);
          resolve();
        } catch (error) {
          reject(error);
        } finally {
          pending = false;
          timeoutId = null;
        }
      }, delay);
    });
  };

  debouncedFn.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      pending = false;
      timeoutId = null;
    }
  };

  return debouncedFn as DebouncedMutate<T>;
};

export default debounceMutate;
