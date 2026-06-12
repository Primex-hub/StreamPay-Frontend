import { useState } from 'react';
import { useInterval } from './useInterval.js';

/**
 * Returns a `now` timestamp that updates on an interval, so components can
 * re-render live counters without managing their own timer.
 * @param {number} [interval] - update interval in ms
 * @param {boolean} [enabled] - pause ticking when false
 * @returns {number} current time in ms
 */
export function useNow(interval = 1000, enabled = true) {
  const [now, setNow] = useState(Date.now());

  useInterval(() => setNow(Date.now()), enabled ? interval : null);

  return now;
}
