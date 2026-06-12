import { useEffect, useRef } from 'react';

/**
 * Declarative setInterval. The latest callback is always invoked without
 * resetting the timer, and passing a null delay pauses the interval.
 * @param {() => void} callback - function to run on each tick
 * @param {number|null} delay - interval in ms, or null to pause
 */
export function useInterval(callback, delay) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay == null) return undefined;
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
