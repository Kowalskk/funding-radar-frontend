'use client';

import { useEffect, useState } from 'react';

const mockTokens = [
  { token: 'BTC', apr: 45.2, exchange: 'Hyperliquid' },
  { token: 'ETH', apr: -12.8, exchange: 'Aster' },
  { token: 'SOL', apr: 128.5, exchange: 'Hyperliquid' },
  { token: 'DOGE', apr: 312.0, exchange: 'Pacifica' },
  { token: 'PIPPIN', apr: 1694.3, exchange: 'Aster' },
  { token: 'TRUMP', apr: 238.3, exchange: 'Hyperliquid' },
  { token: 'WIF', apr: -67.4, exchange: 'Aster' },
  { token: 'PEPE', apr: 89.1, exchange: 'Pacifica' },
  { token: 'ARB', apr: -23.6, exchange: 'Hyperliquid' },
  { token: 'OP', apr: 56.7, exchange: 'Extended' },
  { token: 'PIXEL', apr: 822.2, exchange: 'Hyperliquid' },
  { token: 'ZORA', apr: 229.5, exchange: 'Aster' },
];

export const LiveTicker = () => {
  const [items, setItems] = useState([...mockTokens, ...mockTokens]);

  return (
    <div className="w-full overflow-hidden py-4 border-y border-border bg-surface/60 mt-16 relative z-10">
      <div className="flex gap-12 animate-ticker w-max hover:[animation-play-state:paused] px-6">
        {items.map((t, i) => (
          <div key={i} className="flex items-center gap-2.5 whitespace-nowrap font-mono text-sm group">
            <span className="text-text-primary font-bold">{t.token}</span>
            <span className={`font-semibold ${t.apr >= 0 ? 'text-accent-green' : 'text-accent-red'}`}>
              {t.apr >= 0 ? '+' : ''}{t.apr.toFixed(1)}%
            </span>
            <span className="text-xs text-text-muted bg-card px-2 py-0.5 rounded border border-border/50 group-hover:border-accent-purple/30 transition-colors">
              {t.exchange}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
