import Link from 'next/link';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(123,63,228,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(123,63,228,0.06)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,black_20%,transparent_100%)] animate-grid-pulse" />
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-accent-purple/30 blur-[100px] animate-float" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] rounded-full bg-accent-cyan/30 blur-[100px] animate-float [animation-delay:-4s]" />
      <div className="absolute top-[30%] right-[15%] w-[300px] h-[300px] rounded-full bg-accent-green/15 blur-[100px] animate-float [animation-delay:-8s]" />

      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-purple/10 border border-accent-purple/25 rounded-full text-xs font-medium text-accent-purple mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse-slow" />
          Live funding rates across 4 DEXs
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          <span className="gradient-text">Funding Rate</span><br />
          Arbitrage, Simplified.
        </h1>

        <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          Real-time aggregation of perpetual DEX funding rates.
          Spot delta-neutral opportunities across Hyperliquid, Aster,
          and more — before everyone else.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          <Link href="/app" className="btn-primary px-10 py-4 text-base bg-gradient-hero bg-[length:200%_200%] animate-gradient-xy">
            Open Dashboard
          </Link>
          <Link href="#features" className="btn-outline px-10 py-4 text-base">
            How it works
          </Link>
        </div>
      </div>
    </section>
  );
};
