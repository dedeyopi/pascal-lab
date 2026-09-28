/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#03081a',
          900: '#060d21',
          800: '#0a1530',
          700: '#0f1e42',
          600: '#16295a',
          500: '#1f3878',
        },
        electric: { DEFAULT: '#2f7bff', light: '#5b9bff', dark: '#1a5ce0' },
        aqua: { DEFAULT: '#22d3ee', light: '#67e8f9', dark: '#0891b2' },
        grape: { DEFAULT: '#8b5cf6', light: '#a78bfa', dark: '#6d28d9' },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      opacity: {
        6: '0.06',
        8: '0.08',
        12: '0.12',
        15: '0.15',
        35: '0.35',
        45: '0.45',
        55: '0.55',
        65: '0.65',
        85: '0.85',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(47,123,255,.28), 0 10px 46px -14px rgba(47,123,255,.6)',
        card: '0 18px 50px -24px rgba(0,0,0,.95)',
      },
      keyframes: {
        riseIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'none' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-7px)' },
        },
        glowPulse: {
          '0%,100%': { opacity: '.55' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        riseIn: 'riseIn .45s cubic-bezier(.2,.7,.3,1) both',
        floaty: 'floaty 5s ease-in-out infinite',
        glowPulse: 'glowPulse 2.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};