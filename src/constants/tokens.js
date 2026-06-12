/**
 * Supported tokens on the Stellar / Soroban network (mock list).
 * Each token has a code, a human label, the number of decimals, an icon and
 * an accent color used to tint per-token UI such as progress bars.
 */
export const TOKENS = [
  { code: 'XLM', label: 'Stellar Lumens', decimals: 7, icon: '🌟', color: '#fbbd23' },
  { code: 'USDC', label: 'USD Coin', decimals: 6, icon: '💵', color: '#2775ca' },
  { code: 'EURC', label: 'Euro Coin', decimals: 6, icon: '💶', color: '#36d399' },
  { code: 'yXLM', label: 'Yield XLM', decimals: 7, icon: '📈', color: '#a78bfa' },
];

export const DEFAULT_TOKEN = 'USDC';

/** Fallback accent color when a token is unknown. */
export const DEFAULT_TOKEN_COLOR = '#5b8cff';

/**
 * Look up a token definition by its code.
 * @param {string} code
 * @returns {object|undefined}
 */
export function getToken(code) {
  return TOKENS.find((t) => t.code === code);
}

/**
 * Accent color for a token, falling back to the brand color when unknown.
 * @param {string} code
 * @returns {string}
 */
export function tokenColor(code) {
  return getToken(code)?.color || DEFAULT_TOKEN_COLOR;
}
