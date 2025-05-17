import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './app/pages/**/**/*.{js,ts,jsx,tsx,mdx}',
    './app/components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/routes/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      rotate: {
        'y-180': '360deg',
      },
      colors: {},
      backgroundImage: {},
      animation: {
        flash: 'flash 1s linear',
        flip: 'flip 1s ease-in-out',
        marquee: 'marquee var(--t,10s) linear infinite',
        'infinite-scroll': 'infiniteScroll 25s linear infinite',
      },
      keyframes: {
        flash: {
          '0%, 50%, 100%': { opacity: '1' },
          '25%, 75%': { opacity: '0' },
        },
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        infiniteScroll: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - 1rem))' },
        },
      },
      fontFamily: {
        Inter: ['Inter', 'sans-serif'],
        Poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
} satisfies Config;
