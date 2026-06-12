import { createContext, useCallback, useEffect, useState } from 'react';
import {
  connectWallet,
  disconnectWallet,
  restoreWallet,
  wasConnected,
} from '../services/wallet.js';

/**
 * Global application context: holds the connected wallet account and the
 * connection lifecycle helpers. Streams are loaded per-page via useStreams.
 */
export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);

  // Restore a previous session on first mount.
  useEffect(() => {
    let active = true;
    if (wasConnected()) {
      restoreWallet().then((acc) => {
        if (active) setAccount(acc);
      });
    }
    return () => {
      active = false;
    };
  }, []);

  const connect = useCallback(async () => {
    setConnecting(true);
    setError(null);
    try {
      const acc = await connectWallet();
      setAccount(acc);
      return acc;
    } catch (e) {
      setError(e.message || 'Failed to connect wallet');
      throw e;
    } finally {
      setConnecting(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    await disconnectWallet();
    setAccount(null);
  }, []);

  const value = {
    account,
    isConnected: Boolean(account),
    connecting,
    error,
    connect,
    disconnect,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
