'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ConnectionStatus } from '@/lib/types';

const RECONNECT_INITIAL_DELAY = 1000;
const RECONNECT_MAX_DELAY = 30000;

export const useWebSocket = (url: string | undefined) => {
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const [lastMessage, setLastMessage] = useState<any>(null);
  const ws = useRef<WebSocket | null>(null);
  const reconnectDelay = useRef(RECONNECT_INITIAL_DELAY);
  const reconnectTimeout = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(() => {
    if (!url) return;
    
    try {
      setStatus('connecting');
      ws.current = new WebSocket(url);

      ws.current.onopen = () => {
        console.log('WSConnected');
        setStatus('connected');
        reconnectDelay.current = RECONNECT_INITIAL_DELAY;
      };

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'ping') {
            ws.current?.send(JSON.stringify({ type: 'pong' }));
            return;
          }
          setLastMessage(data);
        } catch (e) {
          console.error('WS Parse Error', e);
        }
      };

      ws.current.onclose = () => {
        setStatus('disconnected');
        // Exponential backoff
        reconnectTimeout.current = setTimeout(() => {
          reconnectDelay.current = Math.min(reconnectDelay.current * 2, RECONNECT_MAX_DELAY);
          connect();
        }, reconnectDelay.current);
      };

      ws.current.onerror = (error) => {
        console.error('WS Error', error);
        setStatus('error');
      };
    } catch (e) {
      console.error('WS Connection Error', e);
      setStatus('error');
    }
  }, [url]);

  useEffect(() => {
    connect();
    return () => {
      ws.current?.close();
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
    };
  }, [connect]);

  const subscribe = useCallback((channels: string[]) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ action: 'subscribe', channels }));
    }
  }, []);

  const unsubscribe = useCallback((channels: string[]) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ action: 'unsubscribe', channels }));
    }
  }, []);

  return { status, lastMessage, subscribe, unsubscribe };
};
