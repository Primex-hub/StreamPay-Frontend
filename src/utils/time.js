/**
 * Time helpers for working with payment streams.
 * All timestamps are unix epoch milliseconds unless noted.
 */

export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

/**
 * Clamp a value between a min and max.
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Fraction (0..1) of a stream that has elapsed at a given moment.
 * @param {number} start - start time in ms
 * @param {number} end - end time in ms
 * @param {number} [now] - reference time in ms, defaults to Date.now()
 * @returns {number}
 */
export function elapsedFraction(start, end, now = Date.now()) {
  if (end <= start) return now >= end ? 1 : 0;
  return clamp((now - start) / (end - start), 0, 1);
}

/**
 * Milliseconds remaining until a stream ends (never negative).
 * @param {number} end
 * @param {number} [now]
 * @returns {number}
 */
export function msRemaining(end, now = Date.now()) {
  return Math.max(0, end - now);
}

/**
 * Convert a duration in days to milliseconds.
 * @param {number} days
 * @returns {number}
 */
export function daysToMs(days) {
  return days * DAY;
}
