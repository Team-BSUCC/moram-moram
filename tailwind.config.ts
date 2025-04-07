import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
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
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
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
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
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
