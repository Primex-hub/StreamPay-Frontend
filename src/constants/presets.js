import { DAY, HOUR } from '../utils/time.js';

/**
 * Quick-pick stream durations for the CreateStream form. Each preset has a
 * label and the duration it represents in milliseconds.
 */
export const DURATION_PRESETS = [
  { label: '1 hour', ms: HOUR },
  { label: '1 day', ms: DAY },
  { label: '1 week', ms: 7 * DAY },
  { label: '1 month', ms: 30 * DAY },
  { label: '3 months', ms: 90 * DAY },
];

/** Default duration applied when the form first loads. */
export const DEFAULT_DURATION_MS = 30 * DAY;

/**
 * Find a duration preset by its millisecond value.
 * @param {number} ms
 * @returns {{label:string, ms:number}|undefined}
 */
export function presetForMs(ms) {
  return DURATION_PRESETS.find((p) => p.ms === ms);
}
