import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      fontSize: {
        ss: 'var(--text-ss)', // 10px
        sm: 'var(--text-sm)', // 12px
        md: 'var(--text-md)', // 13px
        mlg: 'var(--text-mlg)', // 16px
        lg: 'var(--text-lg)', // 22px
        xl: 'var(--text-xl)', // 24px
        '2xl': 'var(--text-2xl)', // 28px
      },
      colors: {
        // 기존 정의
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        // 추가 색상 정의
        black: 'var(--color-black)',
        gray: 'var(--color-gray)',
        lightgray: 'var(--color-lightgray)',
        white: {
          DEFAULT: 'var(--color-white)',
          dark: 'var(--color-white-dark)',
          light: 'var(--color-white-light)',
        },
        pink: {
          pastel: 'var(--color-pink-pastel)',
          pigment: 'var(--color-pink-pigment)',
        },
        red: {
          pastel: 'var(--color-red-pastel)',
          pigment: 'var(--color-red-pigment)',
        },
        orange: {
          pastel: 'var(--color-orange-pastel)',
          pigment: 'var(--color-orange-pigment)',
        },
        yellow: {
          pastel: 'var(--color-yellow-pastel)',
          pigment: 'var(--color-yellow-pigment)',
        },
        green: {
          pastel: 'var(--color-green-pastel)',
          pigment: 'var(--color-green-pigment)',
        },
        sky: {
          pastel: 'var(--color-sky-pastel)',
          pigment: 'var(--color-sky-pigment)',
        },
        blue: {
          pastel: 'var(--color-blue-pastel)',
          pigment: 'var(--color-blue-pigment)',
        },
        purple: {
          pastel: 'var(--color-purple-pastel)',
          pigment: 'var(--color-purple-pigment)',
        },
        violet: {
          pastel: 'var(--color-violet-pastel)',
          pigment: 'var(--color-violet-pigment)',
        },
      },
      letterSpacing: {
        tighter: '-0.003em',
      },
      textWrap: {
        balance: 'balance',
      },
    },
  },
  plugins: [],
};

export default config;
