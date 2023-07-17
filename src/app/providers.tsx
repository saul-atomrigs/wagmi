'use client';

import * as React from 'react';
import { WagmiConfig } from 'wagmi';

import { config } from '../wagmi';

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  /** WagmiConfig로 app을 감싸기: */
  return <WagmiConfig config={config}>{mounted && children}</WagmiConfig>;
}
