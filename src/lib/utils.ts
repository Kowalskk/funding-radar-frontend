import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAPR(val: number | null): string {
  if (val === null || isNaN(val)) return '—';
  return `${val.toFixed(2)}%`;
}

export function aprColorClass(val: number): string {
  if (val > 500) return 'text-accent-yellow';
  if (val > 0) return 'text-accent-green';
  if (val < 0) return 'text-accent-red';
  return 'text-text-secondary';
}

export function formatVolume(vol: number | null): string {
  if (vol === null || isNaN(vol)) return '—';
  if (vol >= 1000000) return `$${(vol / 1000000).toFixed(1)}M`;
  if (vol >= 1000) return `$${(vol / 1000).toFixed(1)}K`;
  return `$${vol.toFixed(0)}`;
}

export function getExchangeInfo(slug: string) {
  const mapping: Record<string, { name: string; color: string; bg: string }> = {
    hyperliquid: { name: 'Hyperliquid', color: 'bg-green-400', bg: 'bg-green-400/10' },
    aster: { name: 'Aster', color: 'bg-cyan-400', bg: 'bg-cyan-400/10' },
    pacifica: { name: 'Pacifica', color: 'bg-purple-400', bg: 'bg-purple-400/10' },
    extended: { name: 'Extended', color: 'bg-orange-400', bg: 'bg-orange-400/10' },
    dydx: { name: 'dYdX', color: 'bg-blue-400', bg: 'bg-blue-400/10' },
    binance: { name: 'Binance', color: 'bg-yellow-400', bg: 'bg-yellow-400/10' },
  };
  return mapping[slug.toLowerCase()] || { name: slug.toUpperCase(), color: 'bg-gray-400', bg: 'bg-gray-400/10' };
}
