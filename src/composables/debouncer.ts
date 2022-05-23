const DEFAULT_DEBOUNCE_TIME = 500;

type TimeoutHandle = ReturnType<typeof setTimeout>; // TODO: Move to global types
type Fn = (...args: unknown[]) => void; // TODO: Move to global types

const useDebouncer = (callback: Fn, time: number = DEFAULT_DEBOUNCE_TIME) => {
  let timeoutHandle: TimeoutHandle;

  const debounce = (...args: unknown[]): void => {
    if (timeoutHandle) {
      clearTimeout(timeoutHandle);
    }
    timeoutHandle = setTimeout(() => {
      // eslint-disable-next-line node/no-callback-literal
      callback(...args);
    }, time);
  };

  return debounce;
};

export default useDebouncer;
