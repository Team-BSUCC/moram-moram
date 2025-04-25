import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      aspectRatio: {
        guestModal: '627/860',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeOutRight: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(30px)' },
        },
        fadeOutLeft: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(-30px)' },
        },
      },
      animation: {
        fadeInOnce: 'fadeIn 0.5s ease-out',
        'fade-in-right': 'fadeInRight 0.4s ease-out',
        'fade-in-left': 'fadeInLeft 0.4s ease-out',
        'fade-out-right': 'fadeOutRight 0.4s ease-in forwards',
        'fade-out-left': 'fadeOutLeft 0.4s ease-in forwards',
      },
      zIndex: {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '10': '10',
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)'],
      },
      fontSize: {
        '48-semibold': ['48px', '150%'],
        '40-semibold': ['40px', '150%'],
        '36-semibold': ['36px', '150%'],
        '36-regular': ['36px', '150%'],
        '32-semibold': ['32px', '150%'],
        '32-regular': ['32px', '150%'],
        '28-regular': ['28px', '150%'],
        '24-semibold': ['24px', '135%'],
        '20-bold': ['20px', '150%'],
        '20-medium': ['20px', '150%'],
        '20-regular': ['20px', '150%'],
        '16-semibold': ['16px', '125%'],
        '16-regular': ['16px', '125%'],
        ss: 'var(--text-ss)', // 10px
        sm: 'var(--text-sm)', // 12px
        md: 'var(--text-md)', // 13px
        mlg: 'var(--text-mlg)', // 16px
        lg: 'var(--text-lg)', // 22px
        xl: 'var(--text-xl)', // 24px
        '2xl': 'var(--text-2xl)', // 28px
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      colors: {
        // 기존 정의
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        // 추가 색상 정의
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        main: 'var(--color-main)',
        sub: 'var(--color-sub)',
        caption: 'var(--color-caption)',
        assist: 'var(--color-assist)',
        backgroundColor: 'var(--color-background)',
        stroke: 'var(--color-background)',
        error: 'var(--color-error)',
        focus: 'var(--color-focus)',
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
        beige: {
          DEFAULT: 'var(--color-beige)',
          light: 'var(--color-beige-light)',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      letterSpacing: {
        tighter: '-0.003em',
      },
      textWrap: {
        balance: 'balance',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [],
};

export default config;
