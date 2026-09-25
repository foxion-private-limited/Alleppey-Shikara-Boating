import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f3f7f4',
          100: '#e3ece6',
          200: '#c7dcd0',
          300: '#9ec4b2',
          400: '#70a48e',
          500: '#4e8771',
          600: '#3c6d5b',
          700: '#315749',
          800: '#28463c',
          900: '#1b322b',
          950: '#0e1c17',
        },
        cream: {
          50: '#faf8f5',
          100: '#f5f0e6',
          200: '#ece3d2',
          300: '#ded0b5',
          400: '#cdb792',
          500: '#bca075',
        },
        earth: {
          50: '#f7f6f4',
          100: '#edeae4',
          200: '#ddd5c9',
          300: '#c5b8a5',
          400: '#aa967e',
          500: '#947d64',
          600: '#7d6750',
          700: '#63513f',
          800: '#514336',
          900: '#43372e',
        },
        gold: {
          300: '#ebd197',
          400: '#deb86d',
          500: '#c89d47',
          600: '#a87e33',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
