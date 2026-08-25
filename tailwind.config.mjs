/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: {
        carbon: { DEFAULT: '#0A0B0D', raised: '#121418', line: '#1E2229' },
        signal: '#C6FF2E',
        gold: '#E9B949',
        silver: '#AEB6BF',
        bronze: '#C08A5A',
        live: '#33D17A',
        warn: '#E5703A',
        ink: { DEFAULT: '#EDEFF2', dim: '#7A828C', faint: '#3A4049' },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-xl': ['clamp(4.5rem, 13vw, 13rem)', { lineHeight: '0.88', letterSpacing: '0.01em' }],
        'display-lg': ['clamp(3rem, 8vw, 7.5rem)', { lineHeight: '0.92', letterSpacing: '0.01em' }],
        'display-md': ['clamp(2.2rem, 5vw, 4.5rem)', { lineHeight: '0.95', letterSpacing: '0.02em' }],
      },
      transitionTimingFunction: { settle: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    },
  },
  plugins: [],
};
