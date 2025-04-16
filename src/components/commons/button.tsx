import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

const buttonVariants = cva(
  'inline-flex items-center w-full justify-center rounded-lg font-semibold transition-colors outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-black ',
        secondary: 'bg-beige-light text-black',
        outline: 'bg-white-light text-black border-beige border',
      },
      size: {
        default:
          'text-16-regular sm:text-20-bold md:text-24-semibold h-8 sm:h-10 md:h-12 px-3 sm:px-4 md:px-6',
        sm: 'text-14 sm:text-16-regular md:text-20-medium h-6 sm:h-9 md:h-10 px-3 sm:px-4',
        lg: 'text-20-bold sm:text-24-semibold md:text-28-regular h-10 sm:h-12 md:h-14 px-4 sm:px-5 md:px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode;
    className?: never;
  };

/**
 * 버튼 공통 컴포넌트
 * @param variant - 버튼의 테마 종류
 * @param size - 버튼의 크기 종류
 * @param children - 버튼 안에 들어가는 텍스트
 * @param props - 버튼의 기본 속성
 * @returns - 버튼 컴포넌트
 */
const Button = ({ variant, size, children, ...props }: ButtonProps) => {
  return (
    <button className={twMerge(buttonVariants({ variant, size }))} {...props}>
      {children}
    </button>
  );
};

export default Button;
