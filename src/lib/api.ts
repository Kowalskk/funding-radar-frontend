export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.fundingradar.com';
export const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'wss://api.fundingradar.com';

export const API_BASE = `${API_URL}/api/v1`;

export async function fetcher<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(error.message || res.statusText);
  }

  return res.json();
}
