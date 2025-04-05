import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const inputVariants = cva('outline-none', {
  variants: {
    variant: {
      default: 'border border-[#E6E6E6] p-2',
      none: 'border-none',
    },
    sizes: {
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    sizes: 'md',
  },
});

type InputProps = VariantProps<typeof inputVariants> &
  React.InputHTMLAttributes<HTMLInputElement>;

/**
 * 인풋 공통 컴포넌트
 * @param variant - Input의 테마 종류
 * @param sizes - Input의 크기 종류
 * @returns - <input />
 */
const Input = ({ variant, sizes, ...inputProps }: InputProps) => {
  return (
    <input
      className={twMerge(inputVariants({ variant, sizes }))}
      {...inputProps}
    />
  );
};

export default Input;
