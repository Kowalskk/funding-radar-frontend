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

export function exchangeInitial(slug: string): string {
  const mapping: Record<string, string> = {
    hyperliquid: 'HL',
    aster: 'AS',
    pacifica: 'PA',
    extended: 'EX'
  };
  return mapping[slug.toLowerCase()] || slug.substring(0, 2).toUpperCase();
}

export function exchangeColor(slug: string): string {
  const mapping: Record<string, string> = {
    hyperliquid: '#00e676',
    aster: '#00e5ff',
    pacifica: '#7b3fe4',
    extended: '#ff9100'
  };
  return mapping[slug.toLowerCase()] || '#7b8ba5';
}
