'use client';

import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/lib/api';
import { FundingToken } from '@/lib/types';
import { useState, useEffect } from 'react';

interface FundingRatesParams {
  timeframe?: string;
  exchanges?: string[];
  token?: string;
}

export const useFundingRates = (params: FundingRatesParams = {}, wsUpdate?: any) => {
  const [liveData, setLiveData] = useState<FundingToken[]>([]);

  const query = useQuery({
    queryKey: ['fundingRates', params],
    queryFn: () => {
      const sp = new URLSearchParams();
      if (params.timeframe) sp.append('timeframe', params.timeframe);
      if (params.token) sp.append('token', params.token);
      params.exchanges?.forEach(ex => sp.append('exchanges[]', ex));
      
      return fetcher<{ data: FundingToken[] }>(`/funding/rates?${sp.toString()}`);
    },
    staleTime: 30000, // 30s
  });

  useEffect(() => {
    if (query.data?.data) {
      setLiveData(query.data.data);
    }
  }, [query.data]);

  // Handle WebSocket updates
  useEffect(() => {
    if (wsUpdate?.type === 'funding_update' && wsUpdate.data) {
      const updates = wsUpdate.data as FundingToken[];
      setLiveData(prev => {
        const newMap = new Map(prev.map(t => [t.token, t]));
        updates.forEach(update => {
          newMap.set(update.token, update);
        });
        return Array.from(newMap.values());
      });
    }
  }, [wsUpdate]);

  return {
    ...query,
    data: liveData,
  };
};
