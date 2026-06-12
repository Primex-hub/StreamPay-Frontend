import { useEffect, useState } from 'react';

/**
 * Returns a `now` timestamp that updates on an interval, so components can
 * re-render live counters without managing their own timer.
 * @param {number} [interval] - update interval in ms
 * @param {boolean} [enabled] - pause ticking when false
 * @returns {number} current time in ms
 */
export function useNow(interval = 1000, enabled = true) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (!enabled) return undefined;
    const id = setInterval(() => setNow(Date.now()), interval);
    return () => clearInterval(id);
  }, [interval, enabled]);

  return now;
}
