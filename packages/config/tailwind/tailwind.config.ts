import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'indimba-red': {
          900: '#7B0019',
          700: '#A50D25',
          500: '#C8102E',
          300: '#F04060',
          100: '#FFE0E5',
        },
        'indimba-gold': {
          900: '#6B5200',
          700: '#B8960C',
          500: '#FFD700',
          300: '#FFE866',
          100: '#FFFBE0',
        },
        surface: {
          900: '#0D0D0D',
          800: '#141414',
          700: '#1E1E1E',
          600: '#262626',
          500: '#333333',
          400: '#4B5563',
          300: '#6B7280',
          200: '#9CA3AF',
          100: '#E5E7EB',
        },
        platform: {
          entertainment: '#C8102E',
          sports: '#1D4ED8',
          music: '#7C3AED',
          events: '#0891B2',
          community: '#059669',
          business: '#D97706',
          lifestyle: '#DB2777',
          podcasts: '#EA580C',
          store: '#FFD700',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Bebas Neue', 'Impact', 'sans-serif'],
        heading: ['var(--font-inter)', 'Inter', 'Helvetica Neue', 'sans-serif'],
        body: ['var(--font-inter)', 'Inter', 'Helvetica Neue', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'Courier New', 'monospace'],
      },
      animation: {
        'ticker': 'ticker 30s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
