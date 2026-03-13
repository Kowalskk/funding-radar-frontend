'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { fetcher } from '@/lib/api';
import { SimulateRequest, SimulateResponse } from '@/lib/types';
import { Calculator, Zap, DollarSign, Percent, TrendingUp, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Simulator() {
  const [amount, setAmount] = useState<number>(1000);
  const [leverage, setLeverage] = useState<number>(1);
  const [spread, setSpread] = useState<number>(20);
  const [days, setDays] = useState<number>(30);

  const simulate = useMutation({
    mutationFn: (data: SimulateRequest) => 
      fetcher<SimulateResponse>('/simulate', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  });

  const handleSimulate = () => {
    simulate.mutate({ amount, leverage, spread, days });
  };

  const result = simulate.data;

  // Manual calculation for responsive feel if mutation hasn't run
  const estDaily = (amount * leverage * (spread / 100)) / 365;
  const estTotal = estDaily * days;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Input Panel */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-card border border-white/5 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="w-5 h-5 text-purple-400" />
            <h3 className="font-display font-bold">Simulator Controls</h3>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Initial Capital ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-deep border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-purple/50 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex justify-between">
                Leverage <span>{leverage}x</span>
              </label>
              <input 
                type="range" 
                min="1" 
                max="20" 
                step="0.5"
                value={leverage}
                onChange={(e) => setLeverage(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Spread APR (%)</label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="number" 
                  value={spread}
                  onChange={(e) => setSpread(Number(e.target.value))}
                  className="w-full bg-deep border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-purple/50 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Duration (Days)</label>
              <input 
                type="number" 
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full bg-deep border border-white/10 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-purple/50 outline-none transition-all"
              />
            </div>

            <button 
              onClick={handleSimulate}
              disabled={simulate.isPending}
              className="w-full py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple/20"
            >
              <Zap className="w-4 h-4" />
              {simulate.isPending ? 'Calculating...' : 'Run Simulation'}
            </button>
          </div>
        </div>

        <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 flex gap-3">
          <Info className="w-5 h-5 text-orange-400 shrink-0" />
          <p className="text-xs text-orange-200/70 leading-relaxed">
            Note: Simulator uses constant funding rates. Real-world rates fluctuate every 1-8 hours depending on the exchange.
          </p>
        </div>
      </div>

      {/* Results Panel */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-card border border-white/5 rounded-2xl p-8 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-2xl font-display font-bold">Simulation Results</h3>
              <p className="text-gray-400 text-sm">Estimated returns for your strategy.</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-400/50" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 rounded-2xl bg-deep/50 border border-white/5">
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-2 text-center">Estimated Daily Profit</div>
              <div className="text-3xl font-display font-bold text-center text-green-400">
                +${estDaily.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-purple-500/10 border border-purple-500/20">
              <div className="text-[10px] text-purple-400 uppercase font-bold tracking-widest mb-2 text-center">Total Return ({days}d)</div>
              <div className="text-3xl font-display font-bold text-center text-white">
                +${estTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Breakdown</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm py-2 border-b border-white/5">
                <span className="text-gray-400">Notional Size</span>
                <span className="font-mono font-bold">${(amount * leverage).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm py-2 border-b border-white/5">
                <span className="text-gray-400">Effective Monthly Yield</span>
                <span className="font-mono font-bold text-green-400">+{((spread/12) * leverage).toFixed(2)}%</span>
              </div>
              <div className="flex justify-between items-center text-sm py-2 border-b border-white/5">
                <span className="text-gray-400">Estimated ROE (Total)</span>
                <span className="font-mono font-bold text-green-400">+{((estTotal/amount)*100).toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
