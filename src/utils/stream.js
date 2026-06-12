import { elapsedFraction } from './time.js';

/**
 * Derived, view-friendly values for a stream at a given moment.
 * @param {object} stream
 * @param {string} me - the current account address
 * @param {number} [now]
 * @returns {{outgoing:boolean, counterparty:string, fraction:number,
 *   streamed:number, claimable:number, remaining:number}}
 */
export function deriveStream(stream, me, now = Date.now()) {
  const outgoing = stream.sender === me;
  const counterparty = outgoing ? stream.recipient : stream.sender;
  const fraction = elapsedFraction(stream.start, stream.end, now);
  const streamed = stream.total * fraction;
  const claimable = Math.max(0, streamed - stream.withdrawn);
  const remaining = Math.max(0, stream.total - streamed);
  return { outgoing, counterparty, fraction, streamed, claimable, remaining };
}

/**
 * Sum the total value of a list of streams, grouped by token.
 * @param {object[]} streams
 * @returns {Record<string, number>}
 */
export function totalsByToken(streams) {
  return streams.reduce((acc, s) => {
    acc[s.token] = (acc[s.token] || 0) + s.total;
    return acc;
  }, {});
}
