/**
 * Supported tokens on the Stellar / Soroban network (mock list).
 * Each token has a code, a human label, the number of decimals and an icon.
 */
export const TOKENS = [
  { code: 'XLM', label: 'Stellar Lumens', decimals: 7, icon: '🌟' },
  { code: 'USDC', label: 'USD Coin', decimals: 6, icon: '💵' },
  { code: 'EURC', label: 'Euro Coin', decimals: 6, icon: '💶' },
  { code: 'yXLM', label: 'Yield XLM', decimals: 7, icon: '📈' },
];

export const DEFAULT_TOKEN = 'USDC';

/**
 * Look up a token definition by its code.
 * @param {string} code
 * @returns {object|undefined}
 */
export function getToken(code) {
  return TOKENS.find((t) => t.code === code);
}
