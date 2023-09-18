import { useCallback, useLayoutEffect, useRef } from "react";

export function useEvent<T extends Function>(fn: T) {
  const fnRef = useRef(fn);
  //11
  //22
  //33
  useLayoutEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const eventCb = useCallback(
    (...args: unknown[]) => {
      return fnRef.current.apply(null, args);
    },
    [fnRef]
  );

  return eventCb as unknown as T;
}
