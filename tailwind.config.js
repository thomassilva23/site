/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: '#0d0c0b',
        surface: '#161411',
        elevated: '#1e1b17',
        'card-border': '#272320',
        amber: {
          DEFAULT: '#f0a500',
          dim: '#c47f00',
          subtle: 'rgba(240, 165, 0, 0.08)',
          glow: 'rgba(240, 165, 0, 0.15)',
        },
        cream: {
          DEFAULT: '#ede9e3',
          muted: '#776e64',
          dim: '#4a443e',
        },
      },
      animation: {
        blob: 'blobFloat 9s ease-in-out infinite',
        'blob-slow': 'blobFloat 12s ease-in-out infinite reverse',
        'fade-up': 'fadeInUp 0.7s ease-out both',
        'fade-in': 'fadeIn 0.6s ease-out both',
        'progress': 'none',
      },
      keyframes: {
        blobFloat: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -25px) scale(1.04)' },
          '66%': { transform: 'translate(-15px, 15px) scale(0.97)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
