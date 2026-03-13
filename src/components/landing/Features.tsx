import { LucideIcon, Zap, BarChart3, Repeat, Calculator, Bell, Database } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  colorClass: string;
}

const FeatureCard = ({ icon: Icon, title, description, colorClass }: FeatureCardProps) => (
  <div className="group relative bg-card border border-border rounded-2xl p-8 transition-all hover:border-accent-purple/20 hover:-translate-y-1 hover:shadow-2xl">
    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-hero opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${colorClass}`}>
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-lg font-bold text-text-primary mb-3">
      {title}
    </h3>
    <p className="text-text-secondary text-sm leading-relaxed">
      {description}
    </p>
  </div>
);

export const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Real-Time Streaming",
      description: "WebSocket-powered live updates every 5 seconds. No refresh needed — rates flow in as they change on-chain.",
      colorClass: "bg-accent-purple/15 text-accent-purple"
    },
    {
      icon: BarChart3,
      title: "Multi-Window APR",
      description: "Compare 1h, 8h, 24h, 7d and 30d annualized rates side-by-side. Spot mean-reversion setups at a glance.",
      colorClass: "bg-accent-cyan/10 text-accent-cyan"
    },
    {
      icon: Repeat,
      title: "Arbitrage Detection",
      description: "Automatic cross-DEX pair matching. See net APR after fees, breakeven time, and optimal long/short legs instantly.",
      colorClass: "bg-accent-green/10 text-accent-green"
    },
    {
      icon: Calculator,
      title: "P&L Simulator",
      description: "Model carry trades with real fee structures. Set capital, holding period, slippage — get net returns before you enter.",
      colorClass: "bg-accent-yellow/10 text-accent-yellow"
    },
    {
      icon: Bell,
      title: "Telegram Alerts",
      description: "Set threshold alerts for any token or arb pair. Get notified on Telegram the second an opportunity hits your criteria.",
      colorClass: "bg-accent-purple/15 text-accent-purple"
    },
    {
      icon: Database,
      title: "TimescaleDB Backed",
      description: "Full historical data with time-bucket aggregation. Backtest strategies against months of funding rate history.",
      colorClass: "bg-accent-cyan/10 text-accent-cyan"
    }
  ];

  return (
    <section id="features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-accent-purple mb-3">
          // Why FundingRadar
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary">
          Built for funding rate traders
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </div>
    </section>
  );
};
