import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { LiveTicker } from "@/components/landing/LiveTicker";
import { Features } from "@/components/landing/Features";
import { CTA } from "@/components/landing/CTA";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <LiveTicker />
      <Features />
      
      {/* Exchange Strip */}
      <section id="exchanges" className="py-16 px-6 border-t border-border text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted mb-8">
          Aggregating from
        </div>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {[
            { name: 'Hyperliquid', color: '#00e676' },
            { name: 'Aster DEX', color: '#00e5ff' },
            { name: 'Pacifica', color: '#7b3fe4' },
            { name: 'Extended', color: '#ffc107' }
          ].map((ex) => (
            <div key={ex.name} className="flex items-center gap-2.5 font-bold text-text-secondary/60 hover:text-text-primary transition-all cursor-default">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ex.color }} />
              {ex.name}
            </div>
          ))}
        </div>
      </section>

      <CTA />

      {/* Footer */}
      <footer className="py-8 px-6 md:px-12 border-t border-border flex flex-col md:row items-center justify-between gap-6 text-xs text-text-muted font-medium">
        <span>© 2025 FundingRadar. Built for degens, by degens.</span>
        <div className="flex items-center gap-8">
          <Link href="/docs" target="_blank" className="hover:text-text-primary transition-colors">API Docs</Link>
          <Link href="https://github.com/Kowalskk/funding-radar-frontend" target="_blank" className="hover:text-text-primary transition-colors">GitHub</Link>
        </div>
      </footer>
    </main>
  );
}
