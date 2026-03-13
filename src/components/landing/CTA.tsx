import Link from 'next/link';

export const CTA = () => {
  return (
    <section className="py-24 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-3xl mx-auto glass-card p-12 md:p-16 text-center relative group">
        <div className="absolute inset-0 bg-radial-gradient from-accent-purple/10 to-transparent pointer-events-none group-hover:from-accent-purple/15 transition-all duration-500" />
        
        <h2 className="text-3xl md:text-4xl font-black text-text-primary mb-6 tracking-tight relative z-10">
          Start finding alpha
        </h2>
        
        <p className="text-lg text-text-secondary mb-10 max-w-lg mx-auto relative z-10">
          Free tier gives you top 10 opportunities. Live data. No signup required.
        </p>

        <Link href="/app" className="btn-primary px-10 py-4 text-base relative z-10 inline-flex">
          Launch Dashboard →
        </Link>
      </div>
    </section>
  );
};
