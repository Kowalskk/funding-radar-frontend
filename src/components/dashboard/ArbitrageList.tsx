'use client';

import { useQuery } from '@tanstack/react-query';
import { fetcher } from '@/lib/api';
import { ArbitrageOpportunity } from '@/lib/types';
import { formatAPR, getExchangeInfo, cn } from '@/lib/utils';
import { Layers, ArrowRight, Zap, AlertCircle } from 'lucide-react';

export default function ArbitrageList({ wsUpdate }: { wsUpdate: any }) {
  const { data, isLoading } = useQuery({
    queryKey: ['arbitrage'],
    queryFn: () => fetcher<{ data: ArbitrageOpportunity[] }>('/arbitrage/opportunities'),
    staleTime: 10000,
  });

  const opportunities = data?.data || [];

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 rounded-2xl bg-card border border-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {opportunities.map((opp, i) => {
        const longInfo = getExchangeInfo(opp.longExchange);
        const shortInfo = getExchangeInfo(opp.shortExchange);
        
        return (
          <div 
            key={`${opp.token}-${i}`}
            className="group relative overflow-hidden bg-card hover:bg-card-hover border border-white/5 hover:border-purple/30 rounded-2xl p-6 transition-all duration-300"
          >
            {/* Glossy gradient background */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple/5 to-transparent pointer-events-none" />
            
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6 w-full lg:w-auto">
                <div className="w-12 h-12 rounded-2xl bg-purple/10 flex items-center justify-center">
                  <Layers className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-display font-bold">{opp.token}</h3>
                    <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] uppercase font-bold text-gray-400">
                      Delta Neutral
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">Estimated Profit based on $10k size</p>
                </div>
              </div>

              <div className="flex flex-1 items-center justify-center gap-4 w-full">
                <div className="flex-1 text-center lg:text-right">
                  <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Long</div>
                  <div className="flex items-center justify-center lg:justify-end gap-2">
                    <div className={cn("w-2 h-2 rounded-full", longInfo.color)} />
                    <span className="font-medium text-sm">{longInfo.name}</span>
                  </div>
                  <div className="text-red-400 font-mono text-xs mt-1">{formatAPR(opp.longRate)}</div>
                </div>

                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Short</div>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <div className={cn("w-2 h-2 rounded-full", shortInfo.color)} />
                    <span className="font-medium text-sm">{shortInfo.name}</span>
                  </div>
                  <div className="text-green-400 font-mono text-xs mt-1">{formatAPR(opp.shortRate)}</div>
                </div>
              </div>

              <div className="flex items-center gap-8 w-full lg:w-auto">
                <div className="flex-1 lg:flex-none text-center lg:text-right">
                  <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">Spread APR</div>
                  <div className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                    {formatAPR(opp.spread)}
                  </div>
                </div>
                
                <button className="flex-1 lg:flex-none px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 rounded-xl font-bold text-sm shadow-lg shadow-purple/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                  <Zap className="w-4 h-4 fill-current" />
                  Execution Plan
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {opportunities.length === 0 && (
        <div className="p-12 border border-dashed border-white/10 rounded-2xl text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-gray-600 mx-auto" />
          <div>
            <p className="text-gray-400 font-medium">Scanning for low-risk spreads...</p>
            <p className="text-xs text-gray-500 mt-1">Spreads appear when the funding rate difference exceeds 5% APR.</p>
          </div>
        </div>
      )}
    </div>
  );
}
