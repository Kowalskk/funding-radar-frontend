import { ConnectionStatus } from "@/lib/types";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AppNavProps {
  activeTab: 'funding' | 'arbitrage' | 'simulator';
  onTabChange: (tab: 'funding' | 'arbitrage' | 'simulator') => void;
  wsStatus: ConnectionStatus;
}

export const AppNav = ({ activeTab, onTabChange, wsStatus }: AppNavProps) => {
  return (
    <nav className="sticky top-0 z-[100] flex items-center justify-between px-6 py-3 bg-surface border-b border-border backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
          <rect width="40" height="40" rx="10" fill="url(#lg)"/>
          <path d="M12 28V14l8 6-8 8zM20 28V14l8 6-8 8z" fill="white" fillOpacity="0.9"/>
          <circle cx="28" cy="12" r="4" fill="#00e5ff" fillOpacity="0.8"/>
          <defs>
            <linearGradient id="lg" x1="0" y1="0" x2="40" y2="40">
              <stop stopColor="#7b3fe4"/>
              <stop offset="1" stopColor="#5c2db5"/>
            </linearGradient>
          </defs>
        </svg>
        <Link href="/" className="text-lg font-bold gradient-text">FundingRadar</Link>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 flex items-center bg-deep/50 p-1 rounded-xl border border-border">
        {([
          { id: 'funding', label: 'Funding' },
          { id: 'arbitrage', label: 'Arbitrage' },
          { id: 'simulator', label: 'Simulator' }
        ] as const).map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "px-5 py-2 text-sm font-semibold rounded-lg transition-all",
              activeTab === tab.id 
                ? "bg-accent-purple text-white shadow-lg" 
                : "text-text-secondary hover:text-text-primary"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2.5 font-mono text-[10px]">
        <span className={cn(
          "w-2 h-2 rounded-full",
          wsStatus === 'connected' ? 'bg-accent-green animate-pulse' :
          wsStatus === 'connecting' ? 'bg-accent-yellow animate-pulse' :
          'bg-accent-red'
        )} />
        <span className="text-text-muted uppercase tracking-wider">
          {wsStatus === 'connected' ? 'Live' : 
           wsStatus === 'connecting' ? 'Connecting' : 
           'Disconnected'}
        </span>
      </div>
    </nav>
  );
};
