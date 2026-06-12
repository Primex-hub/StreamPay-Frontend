import { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';

/**
 * Access the wallet slice of the app context.
 * @returns {{account: object|null, isConnected: boolean, connecting: boolean,
 *   error: string|null, connect: Function, disconnect: Function}}
 */
export function useWallet() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useWallet must be used within an AppProvider');
  }
  return ctx;
}
