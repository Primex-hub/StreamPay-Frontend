/**
 * Validation helpers for the CreateStream form.
 * Each validator returns a string error message, or null when valid.
 */

/**
 * Loosely validate a Stellar public key (starts with G, 56 chars).
 * @param {string} address
 * @returns {boolean}
 */
export function isValidAddress(address) {
  return typeof address === 'string' && /^G[A-Z2-7]{55}$/.test(address.trim());
}

/**
 * Validate the recipient field.
 * @param {string} value
 * @returns {string|null}
 */
export function validateRecipient(value) {
  if (!value || !value.trim()) return 'Recipient address is required';
  if (!isValidAddress(value)) return 'Enter a valid Stellar address (G…)';
  return null;
}

/**
 * Validate the total amount field.
 * @param {number|string} value
 * @returns {string|null}
 */
export function validateAmount(value) {
  const n = Number(value);
  if (value === '' || value == null) return 'Amount is required';
  if (Number.isNaN(n)) return 'Amount must be a number';
  if (n <= 0) return 'Amount must be greater than zero';
  return null;
}

/**
 * Validate the start/end time window.
 * @param {number} start - start time in ms
 * @param {number} end - end time in ms
 * @returns {string|null}
 */
export function validateWindow(start, end) {
  if (!start || !end) return 'Start and end time are required';
  if (end <= start) return 'End time must be after start time';
  return null;
}

/**
 * Whether a value is a positive integer (used for whole-token counts).
 * @param {number|string} value
 * @returns {boolean}
 */
export function isPositiveInt(value) {
  const n = Number(value);
  return Number.isInteger(n) && n > 0;
}

/**
 * Validate an optional stream label: trimmed length 1..40 when present.
 * @param {string} value
 * @returns {string|null}
 */
export function validateLabel(value) {
  if (value == null || value.trim() === '') return null;
  if (value.trim().length > 40) return 'Label must be 40 characters or fewer';
  return null;
}

/**
 * Whether a unix-ms timestamp is strictly in the future.
 * @param {number} ts
 * @param {number} [now]
 * @returns {boolean}
 */
export function isFutureTime(ts, now = Date.now()) {
  return typeof ts === 'number' && ts > now;
}

/**
 * Run all CreateStream validators and return an errors object.
 * @param {{recipient:string, amount:(number|string), start:number,
 *   end:number, label?:string}} form
 * @returns {Record<string,string>}
 */
export function validateStreamForm(form) {
  const errors = {};
  const recipient = validateRecipient(form.recipient);
  if (recipient) errors.recipient = recipient;
  const amount = validateAmount(form.amount);
  if (amount) errors.amount = amount;
  const window = validateWindow(form.start, form.end);
  if (window) errors.window = window;
  const label = validateLabel(form.label);
  if (label) errors.label = label;
  return errors;
}
