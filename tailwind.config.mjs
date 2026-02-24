/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0a0a0a',
          raised: '#141414',
          elevated: '#1e1e1e',
        },
        accent: {
          red: '#e63946',
          orange: '#f77f00',
          cyan: '#00b4d8',
        },
        text: {
          primary: '#ffffff',
          secondary: '#a0a0a0',
          muted: '#6b6b6b',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(4rem, 12vw, 12rem)', { lineHeight: '0.9', letterSpacing: '0.02em' }],
        'display-lg': ['clamp(3rem, 8vw, 8rem)', { lineHeight: '0.95', letterSpacing: '0.02em' }],
        'display-md': ['clamp(2rem, 5vw, 5rem)', { lineHeight: '1', letterSpacing: '0.02em' }],
        'display-sm': ['clamp(1.5rem, 3vw, 3rem)', { lineHeight: '1.1', letterSpacing: '0.02em' }],
      },
      animation: {
        'scroll-left': 'scroll-left 30s linear infinite',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'slide-up': 'slide-up 0.6s ease-out forwards',
      },
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
