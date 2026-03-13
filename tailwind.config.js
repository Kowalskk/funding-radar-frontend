/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        deep: '#06080d',
        surface: '#0c1019', 
        card: '#111722',
        'card-hover': '#151d2d',
        border: '#1a2236',
        'text-primary': '#e8ecf4',
        'text-secondary': '#7b8ba5',
        'text-muted': '#4a5568',
        accent: { 
          purple: '#7b3fe4', 
          cyan: '#00e5ff', 
          green: '#00e676', 
          red: '#ff3d71', 
          yellow: '#ffc107', 
          orange: '#ff9100' 
        }
      },
      fontFamily: {
        display: ['var(--font-outfit)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace']
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #7b3fe4 0%, #00e5ff 50%, #00e676 100%)',
      },
      animation: {
        'grid-pulse': 'gridPulse 8s ease-in-out infinite',
        'float': 'float 12s ease-in-out infinite',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        'ticker': 'ticker 30s linear infinite',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        gridPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(30px, -20px)' },
          '66%': { transform: 'translate(-20px, 30px)' },
        },
        ticker: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        }
      }
    },
  },
  plugins: [],
};
