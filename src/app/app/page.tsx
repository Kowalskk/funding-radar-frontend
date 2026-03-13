'use client';

import { useState } from 'react';
import AppNav from '@/components/layout/AppNav';
import FundingTable from '@/components/dashboard/FundingTable';
import ArbitrageList from '@/components/dashboard/ArbitrageList';
import Simulator from '@/components/dashboard/Simulator';
import { useWebSocket } from '@/hooks/useWebSocket';
import { WS_URL } from '@/lib/api';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'funding' | 'arbitrage' | 'simulator'>('funding');
  const { status, lastMessage } = useWebSocket(WS_URL);

  return (
    <main className="min-h-screen bg-deep text-white font-sans selection:bg-purple/30">
      {/* Background Noise overlay (from globals.css) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] bg-[url('/noise.png')]"></div>
      
      <AppNav 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        wsStatus={status} 
      />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {activeTab === 'funding' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
              <h1 className="text-3xl font-display font-bold text-white tracking-tight">Funding Rates</h1>
              <p className="text-gray-400 mt-1">Real-time perpetual funding rates across all supported exchanges.</p>
            </header>
            <FundingTable wsUpdate={lastMessage} />
          </div>
        )}

        {activeTab === 'arbitrage' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
              <h1 className="text-3xl font-display font-bold text-white tracking-tight">Arbitrage Opportunities</h1>
              <p className="text-gray-400 mt-1">Discover delta-neutral funding rate spreads between centralized and decentralized exchanges.</p>
            </header>
            <ArbitrageList wsUpdate={lastMessage} />
          </div>
        )}

        {activeTab === 'simulator' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header>
              <h1 className="text-3xl font-display font-bold text-white tracking-tight">Strategy Simulator</h1>
              <p className="text-gray-400 mt-1">Simulate returns and risks for funding arbitrage positions with leverage.</p>
            </header>
            <Simulator />
          </div>
        )}
      </div>
    </main>
  );
}
