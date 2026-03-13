'use client';

import { useState, useMemo } from 'react';
import { useFundingRates } from '@/hooks/useFundingRates';
import { formatAPR, formatVolume, getExchangeInfo, cn } from '@/lib/utils';
import { Search, Filter, ArrowUpRight, TrendingUp, Info } from 'lucide-react';

export default function FundingTable({ wsUpdate }: { wsUpdate: any }) {
  const [search, setSearch] = useState('');
  const { data: tokens, isLoading } = useFundingRates({}, wsUpdate);

  const filteredTokens = useMemo(() => {
    return tokens.filter(t => 
      t.token.toLowerCase().includes(search.toLowerCase())
    ).sort((a, b) => (b.highestAPR || 0) - (a.highestAPR || 0));
  }, [tokens, search]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-60 rounded-2xl bg-card/50 border border-white/5 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search tokens (e.g. BTC, SOL)..."
            className="w-full bg-card/50 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-purple/50 transition-all text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-card/50 border border-white/10 rounded-xl text-sm font-medium hover:bg-white/5 transition-colors">
            <Filter className="w-4 h-4" />
            Timeframe: 8h
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filteredTokens.map((token) => (
          <div 
            key={token.token}
            className="group bg-card hover:bg-card-hover border border-white/5 hover:border-purple/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-purple/5"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple/20 to-cyan/20 flex items-center justify-center font-bold text-purple-400">
                  {token.token.charAt(0)}
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg">{token.token}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span>Vol: {formatVolume(token.volume24h)}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400 font-mono">Max APR</div>
                <div className="text-xl font-display font-bold text-green-400">
                  {formatAPR(token.highestAPR)}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {token.rates.map((rate) => {
                const info = getExchangeInfo(rate.exchange);
                const isPositive = rate.apr > 0;
                
                return (
                  <div 
                    key={rate.exchange}
                    className="flex items-center justify-between p-2 rounded-lg bg-deep/50 border border-white/5 group-hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className={cn("w-1.5 h-1.5 rounded-full", info.color)} />
                      <span className="text-xs font-medium text-gray-300">{info.name}</span>
                    </div>
                    <div className={cn(
                      "text-sm font-mono font-bold",
                      isPositive ? "text-green-400" : "text-red-400"
                    )}>
                      {formatAPR(rate.apr)}
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="w-full mt-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
              View Details
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        ))}

        {filteredTokens.length === 0 && (
          <div className="col-span-full py-20 text-center space-y-4">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
              <Info className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-gray-400">No tokens found matching "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
