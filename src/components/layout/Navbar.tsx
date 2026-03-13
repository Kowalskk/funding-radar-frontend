import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-4 bg-deep/80 backdrop-blur-2xl border-bottom border-border">
      <Link href="/" className="flex items-center gap-3">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
          <rect width="40" height="40" rx="10" fill="url(#logoGrad)" />
          <path d="M12 28V14l8 6-8 8zM20 28V14l8 6-8 8z" fill="white" fillOpacity="0.9"/>
          <circle cx="28" cy="12" r="4" fill="#00e5ff" fillOpacity="0.8"/>
          <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40">
              <stop stopColor="#7b3fe4"/>
              <stop offset="1" stopColor="#5c2db5"/>
            </linearGradient>
          </defs>
        </svg>
        <span className="text-xl font-bold tracking-tight gradient-text">FundingRadar</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link href="#features" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Features</Link>
        <Link href="#exchanges" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Exchanges</Link>
        <Link href="/app" className="btn-primary">
          Launch App →
        </Link>
      </div>
    </nav>
  );
};
